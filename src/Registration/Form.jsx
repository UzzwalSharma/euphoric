import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Confetti from "react-confetti";
export default function EuphoricRegistration() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    admissionId: "",
    fullName: "",
    gender: "",
    phone: "",
    email: "",
    course: "",
    year: "",
    branch: "",
    culturalEvent1: "None",
    culturalEvent2: "None",
    technicalEvent1: "None",
    technicalEvent2: "None",
    sportsEvent1: "None",
    sportsEvent2: "None",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const createRegistration = useMutation(api.registrations.createRegistration);

  const courses = [
    "B. Tech",
    "Diploma (Engg.)",
    "B. Arch",
    "M. Pharm",
    "B. Pharm",
    "D. Pharm",
    "BBA",
    "BFSI",
    "MBA",
    "BCA",
    "BFD",
    "B. Com",
  ];

  const culturalEvents = [
    "None",
    "Dance (Group)",
    "Dance (Solo)",
    "Mimicry (Solo)",
    "Musical Instrument (Solo)",
    "Nukkad Natak (Team)",
    "Poetry (Solo)",
    "Rangoli Making",
    "Singing (Group)",
    "Singing (Solo)",
    "Skit (Team)",
  ];

  const technicalEvents = [
    "None",
    "AD Mad Show",
    "Crossward Puzzle",
    "Debate",
    "Extempore",
    "LAN Game",
  ];

  const sportsEvents = [
    "None",
    "Badminton (Doubles)",
    "Badminton (Single)",
    "Basketball (Boys)",
    "Basketball (Girls)",
    "Carrom (Boys)",
    "Carrom (Girls)",
    "Chess (Boys)",
    "Chess (Girls)",
    "Cricket (Boys)",
    "Cricket (Girls)",
    "Lemon Race (Boys)",
    "Lemon Race (Girls)",
    "Long Jump (Boys)",
    "Long Jump (Girls)",
    "Race (100 M)",
    "Race (200 M)",
    "Relay Race (100x4 M)",
    "Shot Put (Boys)",
    "Shot Put (Girls)",
    "Table Tennis (Boys - Single)",
    "Table Tennis (Girls - Single)",
    "Tug of War (Boys)",
    "Tug of War (Girls)",
    "Volleyball (Boys)",
    "Volleyball (Girls)",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Convert year to number
      const registrationData = {
        ...formData,
        year: parseInt(formData.year),
        email: formData.email || undefined,
        branch: formData.branch || undefined,
      };

      await createRegistration(registrationData);

      setSubmitStatus("success");
      setShowConfetti(true);

      // Stop confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      // Reset form
      setFormData({
        admissionId: "",
        fullName: "",
        gender: "",
        phone: "",
        email: "",
        course: "",
        year: "",
        branch: "",
        culturalEvent1: "None",
        culturalEvent2: "None",
        technicalEvent1: "None",
        technicalEvent2: "None",
        sportsEvent1: "None",
        sportsEvent2: "None",
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Registration failed. Please try again.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={["#f97316", "#ec4899", "#ef4444", "#8b5cf6", "#06b6d4"]}
        />
      )}
      {/* Enhanced Visual Grid Background - Fixed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary grid with glow effect */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
          linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
        `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Secondary diagonal grid for depth */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 79px,
            rgba(236, 72, 153, 0.1) 79px,
            rgba(236, 72, 153, 0.1) 80px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 79px,
            rgba(34, 211, 238, 0.1) 79px,
            rgba(34, 211, 238, 0.1) 80px
          )
        `,
            }}
          />
        </div>

        {/* Dotted grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated gradient accents */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-3xl" />

        {/* Corner highlights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-500/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl belanosima-bold text-white mb-2">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              EUPHORIC
            </span>{" "}
            2026
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 belanosima-regular mb-4">
            Event Registration
          </h2>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/30 rounded-full">
            <svg
              className="w-4 h-4 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-red-300 belanosima-regular text-sm">
              Registrations End: 10th March, 2026
            </span>
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-green-300 belanosima-bold">
                  Registration Successful! 🎉
                </p>
                <p className="text-green-300/80 belanosima-regular text-sm mt-1">
                  Your registration has been confirmed. See you at Euphoric
                  2026!
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-red-300 belanosima-bold">
                  Registration Failed
                </p>
                <p className="text-red-300/80 belanosima-regular text-sm mt-1">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Information Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm belanosima-bold">
                1
              </span>
              <h3 className="text-lg md:text-xl belanosima-bold text-white">
                Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Admission ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="admissionId"
                  value={formData.admissionId}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all belanosima-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your admission ID"
                />
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all belanosima-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Gender <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-3">
                  {["Male", "Female"].map((gender) => (
                    <label
                      key={gender}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 hover:border-purple-400 transition-all ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-4 h-4 accent-purple-500"
                      />
                      <span className="text-white/90 belanosima-regular text-sm">
                        {gender}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Phone (WhatsApp) <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all belanosima-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Email Address(optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  pattern=".*@sanskar\.org$"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all belanosima-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="yourname@sanskar.org"
                />
                <p className="text-xs text-white/50 mt-1.5 belanosima-regular">
                  Only College Email Address allowed (sanskar.org)
                </p>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm belanosima-bold">
                2
              </span>
              <h3 className="text-lg md:text-xl belanosima-bold text-white">
                Academic Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Course <span className="text-red-400">*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" className="bg-gray-900">
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option key={course} value={course} className="bg-gray-900">
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Year <span className="text-red-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" className="bg-gray-900">
                    Select Year
                  </option>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <option key={year} value={year} className="bg-gray-900">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                  Branch (if Applied)
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all belanosima-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter branch (optional)"
                />
              </div>
            </div>
          </div>

          {/* Event Registration Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-sm belanosima-bold">
                3
              </span>
              <h3 className="text-lg md:text-xl belanosima-bold text-white">
                Event Registration
              </h3>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-5">
              <p className="text-white/90 belanosima-regular text-sm">
                <strong className="text-yellow-300">Note:</strong> Maximum 2
                events per category
              </p>
            </div>

            <div className="space-y-6">
              {/* Cultural Events */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎭</span>
                  <h4 className="text-base belanosima-bold text-white">
                    Cultural
                  </h4>
                </div>
                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 1
                    </label>
                    <select
                      name="culturalEvent1"
                      value={formData.culturalEvent1}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {culturalEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 2
                    </label>
                    <select
                      name="culturalEvent2"
                      value={formData.culturalEvent2}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-pink-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {culturalEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* Technical Events */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💻</span>
                  <h4 className="text-base belanosima-bold text-white">
                    Technical
                  </h4>
                </div>
                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 1
                    </label>
                    <select
                      name="technicalEvent1"
                      value={formData.technicalEvent1}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {technicalEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 2
                    </label>
                    <select
                      name="technicalEvent2"
                      value={formData.technicalEvent2}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {technicalEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* Sports Events */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚽</span>
                  <h4 className="text-base belanosima-bold text-white">
                    Sports
                  </h4>
                </div>
                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 1
                    </label>
                    <select
                      name="sportsEvent1"
                      value={formData.sportsEvent1}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sportsEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 belanosima-regular mb-1.5 text-sm">
                      Event 2
                    </label>
                    <select
                      name="sportsEvent2"
                      value={formData.sportsEvent2}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sportsEvents.map((event) => (
                        <option
                          key={event}
                          value={event}
                          className="bg-gray-900"
                        >
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white text-base belanosima-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-600 hover:via-pink-600 hover:to-red-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Register Now"
              )}
            </button>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-red-300 text-xs belanosima-regular text-center">
                ⚠️ Incomplete or incorrect details will lead to elimination
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-1.5">
          <p className="text-white/50 belanosima-regular text-xs">
            © 2026 Euphoric - Sanskar Educational Group
          </p>
          <p className="text-white/40 belanosima-regular text-xs flex items-center justify-center gap-1.5">
            Made with <span className="text-red-400">❤️</span> by{" "}
            <span className="text-white/60">Ujjwal Sharma</span>
          </p>
        </div>
      </div>
    </div>
  );
}
