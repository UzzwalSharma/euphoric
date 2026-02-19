import { useState } from "react";

// 🔧 REPLACE THIS URL with your actual Google Form embed link
// In Google Forms: Click Send → Embed (</>) → Copy the src URL from the iframe tag
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf32dCh0LXjxCEl7F2Wj7UJAPNWjgBS_YcQBs9EE9E6Du8y4g/viewform?usp=send_form";

export default function Gform() {
  const [formLoaded, setFormLoaded] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {/* ── Animated Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary grid */}
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

        {/* Diagonal grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 79px, rgba(236, 72, 153, 0.1) 79px, rgba(236, 72, 153, 0.1) 80px),
                repeating-linear-gradient(-45deg, transparent, transparent 79px, rgba(34, 211, 238, 0.1) 79px, rgba(34, 211, 238, 0.1) 80px)
              `,
            }}
          />
        </div>

        {/* Dotted overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Glow blobs */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-500/5 to-transparent" />
      </div>

      {/* ── Content ── */}
   <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
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
              Registrations End: 7th March, 2026
            </span>
          </div>
        </div>

        {/* Google Form iframe card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

          {/* Card header bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10"
            style={{
              background: "linear-gradient(to right, rgba(139,92,246,0.15), rgba(236,72,153,0.15))",
            }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{
                background: "linear-gradient(to right, #f97316, #ec4899)",
              }}
            >
              📋
            </span>
            <div>
              <h3 className="text-white belanosima-bold text-base">Registration Form</h3>
              <p className="text-white/50 text-xs belanosima-regular">Fill all required fields carefully</p>
            </div>
          </div>

          {/* Loading shimmer shown until iframe loads */}
          {!formLoaded && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-6">
              <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50 text-sm">Loading registration form…</p>
            </div>
          )}

          {/* ── GOOGLE FORM IFRAME ── */}
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            title="Euphoric 2026 Registration"
            onLoad={() => setFormLoaded(true)}
            style={{
              display: formLoaded ? "block" : "none",
              width: "100%",
             height: "1100px",
              border: "none",
              background: "transparent",
              colorScheme: "light",
            }}
            allowFullScreen
          />
        </div>

        {/* Warning */}
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <p className="text-red-300 text-xs text-center font-medium">
            ⚠️ Incomplete or incorrect details will lead to elimination
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-1.5">
          <p className="text-white/50 text-xs">
            © 2026 Euphoric - Sanskar Educational Group
          </p>
          <p className="text-white/40 text-xs flex items-center justify-center gap-1.5">
            Made with <span className="text-red-400">❤️</span> by{" "}
            <span className="text-white/60">Ujjwal Sharma</span>
          </p>
        </div>
      </div>
    </div>
  );
}