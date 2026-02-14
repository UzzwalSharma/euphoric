import { SignIn, useUser, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import AdminDashboard from "./Dashboard";

// Allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
  "admin@sanskar.org",
  "ujjwal@sanskar.org",
  "uzzwal7505@gmail.com",

  // Add more authorized emails here
];

export default function ProtectedAdminDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if user's email is in allowed list
      const userEmail = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      const authorized =
        userEmail && ALLOWED_ADMIN_EMAILS.includes(userEmail);
      setIsAuthorized(authorized);
    }
  }, [isLoaded, isSignedIn, user]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl belanosima-regular">Loading...</div>
      </div>
    );
  }

  // Not signed in - show login
  if (!isSignedIn) {
    return (
      <div className="min-h-screen w-full bg-black relative overflow-x-hidden flex items-center justify-center">
        {/* Background Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
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

        <div className="relative z-10 w-full max-w-md px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl belanosima-bold text-white mb-2">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                EUPHORIC
              </span>{" "}
              2026
            </h1>
            <h2 className="text-xl md:text-2xl text-white/90 belanosima-regular mb-4">
              Admin Access
            </h2>
            <p className="text-white/70 belanosima-regular text-sm">
              Sign in with your authorized @sanskar.org email
            </p>
          </div>

          {/* Clerk Sign In */}
          {/* Clerk Sign In */}
<div className="flex justify-center">
  <SignIn
    forceRedirectUrl="/admin"
    fallbackRedirectUrl="/admin"
    signUpForceRedirectUrl="/admin"
    signUpFallbackRedirectUrl="/admin"
    appearance={{
      elements: {
        rootBox: "mx-auto",
        card: "bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl",
        headerTitle: "text-white belanosima-bold",
        headerSubtitle: "text-white/70 belanosima-regular",
        socialButtonsBlockButton:
          "bg-white/10 border border-white/20 text-white hover:bg-white/20",
        formButtonPrimary:
          "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 belanosima-bold",
        formFieldInput:
          "bg-white/5 border border-white/20 text-white belanosima-regular",
        formFieldLabel: "text-white/90 belanosima-regular",
        footerActionLink:
          "text-purple-400 hover:text-purple-300 belanosima-bold",
        identityPreviewText: "text-white belanosima-regular",
        identityPreviewEditButton: "text-purple-400",
      },
    }}
  />
</div>
          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-white/50 text-xs belanosima-regular">
              🔒 Authorized @sanskar.org emails only
            </p>
            <p className="text-white/40 belanosima-regular text-xs">
              © 2026 Euphoric - Sanskar Educational Group
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Signed in but not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-black relative overflow-x-hidden flex items-center justify-center">
        {/* Background Grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
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

        <div className="relative z-10 max-w-md px-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl belanosima-bold text-white mb-2">
              Access Denied
            </h2>
            <p className="text-white/70 belanosima-regular mb-4">
              Your email ({user?.primaryEmailAddress?.emailAddress}) is not
              authorized to access the admin dashboard.
            </p>
            <p className="text-white/50 belanosima-regular text-sm mb-6">
              Please contact the administrator if you believe this is an error.
            </p>
            <div className="flex justify-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authorized - show dashboard
  return (
    <div className="relative">
      {/* User Button - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 border-2 border-white/20",
              userButtonPopoverCard:
                "bg-gray-900 border border-white/10 shadow-2xl",
              userButtonPopoverActionButton: "text-white hover:bg-white/10",
              userButtonPopoverActionButtonText: "text-white",
              userButtonPopoverActionButtonIcon: "text-white/70",
              userButtonPopoverFooter: "hidden",
            },
          }}
          afterSignOutUrl="/admin"
        />
      </div>

      {/* Admin Info Badge - Top Left */}
      <div className="fixed top-4 left-4 z-50 bg-white/5 border border-white/10 rounded-lg px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={user?.fullName || "Admin"} />
            ) : (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="text-white text-sm belanosima-bold">
              {user?.fullName || user?.firstName || "Admin"}
            </p>
            <p className="text-white/60 text-xs belanosima-regular">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <AdminDashboard />
    </div>
  );
}