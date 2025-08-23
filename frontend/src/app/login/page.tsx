"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password); // 🔒 your existing backend call
      console.log("Login response:", data);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        alert("Login successful!");
      } else {
        alert("Login failed, no token returned.");
      }
    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5 animated-gradient relative overflow-hidden">
      {/* Brand / Logo */}
      <div className="absolute top-5 left-5 z-10">
        <span className="brand-text relative inline-block pb-3 text-white font-extrabold tracking-tight"
          style={{ fontFamily: "Poppins, ui-sans-serif, system-ui, -apple-system, Segoe UI" }}>
          FlexDash
        </span>
      </div>

      {/* Glass Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl text-white p-8">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-center text-white/90 mt-2 mb-6">
          Welcome back, please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <div className="relative">
              {/* leading icon */}
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                {/* Mail Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.4-.5 7.1 5.08L18.6 6H4.4Zm15.6 2.07-6.74 4.83a2 2 0 0 1-2.32 0L4 8.07V17.5c0 .28.22.5.5.5h15c.28 0 .5-.22.5-.5V8.07Z" />
                </svg>
              </span>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/15 text-white placeholder-white/70 pl-10 pr-4 py-3 outline-none transition focus:bg-white/20 focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative">
              {/* leading lock icon */}
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                {/* Lock Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1.75a5.25 5.25 0 0 1 5.25 5.25v2h.5A2.25 2.25 0 0 1 20 11.25v7.5A2.25 2.25 0 0 1 17.75 21H6.25A2.25 2.25 0 0 1 4 18.75v-7.5A2.25 2.25 0 0 1 6.25 9h.5v-2A5.25 5.25 0 0 1 12 1.75Zm3.75 7v-2a3.75 3.75 0 1 0-7.5 0v2h7.5Z" />
                </svg>
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/15 text-white placeholder-white/70 pl-10 pr-12 py-3 outline-none transition focus:bg-white/20 focus:ring-2 focus:ring-white/30"
              />

              {/* eye toggle */}
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 focus:outline-none"
              >
                {showPassword ? (
                  // Eye-off
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.81 2.81a1 1 0 0 1 1.41 0l16.97 16.97a1 1 0 1 1-1.41 1.41l-2.4-2.4A11.17 11.17 0 0 1 12 20.25C6.82 20.25 2.53 16.67 1 12c.54-1.6 1.56-3.13 2.9-4.46l-1.1-1.1a1 1 0 0 1 0-1.41ZM7.9 7.9l1.33 1.33A3.75 3.75 0 0 0 12 8.25a3.75 3.75 0 0 0-4.1.35Zm4.6 8.2a3.75 3.75 0 0 0 3.34-5.48l-1.5-1.5a3.75 3.75 0 0 0-4.96 4.96l1.5 1.5c.51.33 1.11.52 1.62.52Z" />
                    <path d="M12 5.75c5.18 0 9.47 3.58 10.99 8.25-.43 1.26-1.14 2.49-2.08 3.56l-1.44-1.44a8.09 8.09 0 0 0 1.73-2.12C20.2 10.9 16.4 8.25 12 8.25c-.63 0-1.25.05-1.85.16l-1.7-1.7c1.14-.41 2.36-.66 3.55-.66Z" />
                  </svg>
                ) : (
                  // Eye
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 5.75c5.18 0 9.47 3.58 10.99 8.25C21.47 18.67 17.18 22.25 12 22.25S2.53 18.67 1 14c1.52-4.67 5.81-8.25 11-8.25Zm0 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-tr from-green-300 to-teal-500 text-black font-semibold py-3 shadow-xl transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="4" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">Created by trustbyfrazier</p>
      </div>

      {/* Page-scoped styles for animated gradient bg + branded underline */}
      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d, #000000);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .brand-text::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 10px;
          bottom: -6px;
          border-radius: 8px;
          background: linear-gradient(90deg, #ffffff 0%, #000000 100%);
          transform: skewX(-12deg);
          box-shadow: 0 6px 20px rgba(0,0,0,0.35);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

