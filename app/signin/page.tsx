"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen w-full flex bg-neutral-950 text-white font-sans selection:bg-white/20">
      {/* ================= LEFT: THE ATMOSPHERE ================= */}
      <div className="hidden lg:flex w-7/12 relative overflow-hidden bg-black items-center justify-center">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-60"></div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

        {/* The Giant Brand Mark */}
        <div className="relative z-10 select-none">
          <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-black opacity-40">
            ICE
          </h1>
        </div>

        {/* Floating Abstract Element */}
        <div className="absolute bottom-20 left-20 border-l border-white/20 pl-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Collection 2025
          </p>
          <p className="text-xl font-serif italic text-white/80">
            "Silence is the ultimate luxury."
          </p>
        </div>
      </div>

      {/* ================= RIGHT: THE ACCESS PORTAL ================= */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center px-8 md:px-20 xl:px-32 relative z-20 bg-neutral-950 border-l border-white/5">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          {/* Navigation */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-neutral-500 uppercase mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <span className="inline-block w-8 h-[2px] bg-white/20 mb-4"></span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
              Client Access
            </h2>
            <p className="text-neutral-500 text-sm font-light tracking-wide leading-relaxed max-w-sm">
              Welcome back. Your private wardrobe and exclusive drops await.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-10">
            {/* Input: Email */}
            <div className="relative group">
              <input
                type="email"
                required
                className="peer w-full bg-transparent border-b border-neutral-800 py-4 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-500"
                placeholder="Email"
              />
              <label
                className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all 
                peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-4 
                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white"
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>

            {/* Input: Password */}
            <div className="relative group">
              <input
                type="password"
                required
                className="peer w-full bg-transparent border-b border-neutral-800  py-4 text-sm tracking-widest text-white placeholder-transparent focus:outline-none focus:border-white transition-all duration-500"
                placeholder="Password"
              />
              <label
                className="absolute left-0 -top-3 text-[10px] text-neutral-500 uppercase tracking-widest transition-all 
                peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:top-4 
                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-white"
              >
                Password
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Link
                href="#"
                className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-white transition-colors"
              >
                Recover Password
              </Link>
            </div>

            {/* Submit Button */}
            <button className="w-full relative overflow-hidden group bg-white text-black py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:bg-neutral-200">
              <span className="relative z-10 flex items-center justify-center gap-4">
                Enter
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-16 text-center lg:text-left">
            <p className="text-xs text-neutral-600 font-light tracking-wide">
              No account?{" "}
              <Link
                href="/signup"
                className="text-white hover:text-neutral-300 transition-colors ml-2 font-normal border-b border-white/20 pb-0.5 hover:border-white"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
