"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function SignUp() {
  return (
    <div className="min-h-screen w-full flex bg-neutral-950 text-white font-sans">
      {/* ================= LEFT: THE APPLICATION ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative z-10 bg-neutral-950">
        <div className="h-40"></div>
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

        <div className="max-w-md w-full mx-auto relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6 opacity-50">
              <Star className="w-3 h-3 text-white fill-white" />
              <Star className="w-3 h-3 text-white fill-white" />
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-4">
              The Registry.
            </h1>
            <p className="text-neutral-500 text-sm font-light tracking-wide leading-relaxed">
              Join the inner circle. Early access, bespoke tailoring, and
              private events for the discerning few.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-300"
                  placeholder="First"
                />
                <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                  First Name
                </label>
              </div>
              {/* Last Name */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-300"
                  placeholder="Last"
                />
                <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                  Last Name
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                required
                className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-300"
                placeholder="Email"
              />
              <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type="password"
                required
                className="peer w-full bg-transparent border-b border-neutral-800 py-3 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-300"
                placeholder="Password"
              />
              <label className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white">
                Create Password
              </label>
            </div>

            {/* Terms */}
            <div className="pt-4">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border border-neutral-700 bg-transparent peer-checked:bg-white transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-black opacity-0 peer-checked:opacity-100 scale-0 peer-checked:scale-100 transition-all">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest group-hover:text-neutral-300 transition-colors">
                  I accept the{" "}
                  <span className="border-b border-neutral-700">Standards</span>{" "}
                  of the Empire
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full mt-8 bg-transparent border border-neutral-800 py-5 text-xs font-bold tracking-[0.25em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Establish Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center border-t border-neutral-900 pt-8">
            <p className="text-xs text-neutral-600 tracking-wide">
              Already initiated?{" "}
              <Link
                href="/signin"
                className="text-white hover:text-neutral-300 transition-colors ml-2 border-b border-white/20 pb-0.5"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT: THE VISUAL ================= */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-neutral-900 border-l border-white/5">
        {/* Vertical line running down the center */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 z-10"></div>

        {/* Moving Gradient Spotlight */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_70%)] opacity-80 z-0"></div>

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-24 text-center">
          <div className="w-full max-w-sm space-y-12">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase mb-4">
                Privilege 01
              </h3>
              <p className="text-2xl font-serif text-white/90 italic">
                "First access to limited drops."
              </p>
            </div>
            <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.4em] text-neutral-500 uppercase mb-4">
                Privilege 02
              </h3>
              <p className="text-2xl font-serif text-white/90 italic">
                "Complimentary tailoring."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
