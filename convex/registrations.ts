import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new registration
export const createRegistration = mutation({
  args: {
    admissionId: v.string(),
    fullName: v.string(),
    gender: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    course: v.string(),
    year: v.number(),
    branch: v.optional(v.string()),
    culturalEvent1: v.string(),
    culturalEvent2: v.string(),
    technicalEvent1: v.string(),
    technicalEvent2: v.string(),
    sportsEvent1: v.string(),
    sportsEvent2: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if admission ID already exists
    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_admission_id", (q) => q.eq("admissionId", args.admissionId))
      .first();

    if (existing) {
      throw new Error("This admission ID has already been registered!");
    }

    // Check if email already exists (if provided)
    if (args.email) {
      const existingEmail = await ctx.db
        .query("registrations")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();

      if (existingEmail) {
        throw new Error("This email has already been registered!");
      }
    }

    // Create the registration
    const registrationId = await ctx.db.insert("registrations", {
      ...args,
      registeredAt: Date.now(),
    });

    return registrationId;
  },
});

// Get all registrations (for admin)
export const getAllRegistrations = query({
  handler: async (ctx) => {
    return await ctx.db.query("registrations").order("desc").collect();
  },
});

// Get registration by admission ID
export const getRegistrationByAdmissionId = query({
  args: { admissionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("registrations")
      .withIndex("by_admission_id", (q) => q.eq("admissionId", args.admissionId))
      .first();
  },
});

// Get total registration count
export const getRegistrationCount = query({
  handler: async (ctx) => {
    const registrations = await ctx.db.query("registrations").collect();
    return registrations.length;
  },
});

// Get registrations by event
export const getRegistrationsByEvent = query({
  args: { 
    category: v.string(), // "cultural", "technical", or "sports"
    eventName: v.string() 
  },
  handler: async (ctx, args) => {
    const allRegistrations = await ctx.db.query("registrations").collect();
    
    const filtered = allRegistrations.filter((reg) => {
      if (args.category === "cultural") {
        return reg.culturalEvent1 === args.eventName || reg.culturalEvent2 === args.eventName;
      } else if (args.category === "technical") {
        return reg.technicalEvent1 === args.eventName || reg.technicalEvent2 === args.eventName;
      } else if (args.category === "sports") {
        return reg.sportsEvent1 === args.eventName || reg.sportsEvent2 === args.eventName;
      }
      return false;
    });
    
    return filtered;
  },
});