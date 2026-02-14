import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    // Personal Information
    admissionId: v.string(),
    fullName: v.string(),
    gender: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    
    // Academic Information
    course: v.string(),
    year: v.number(),
    branch: v.optional(v.string()),
    
    // Event Registration - Cultural
    culturalEvent1: v.string(),
    culturalEvent2: v.string(),
    
    // Event Registration - Technical
    technicalEvent1: v.string(),
    technicalEvent2: v.string(),
    
    // Event Registration - Sports
    sportsEvent1: v.string(),
    sportsEvent2: v.string(),
    
    // Metadata
    registeredAt: v.number(),
  })
    .index("by_admission_id", ["admissionId"])
    .index("by_email", ["email"])
    .index("by_registration_time", ["registeredAt"]),
});