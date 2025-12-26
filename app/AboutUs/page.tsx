"use client";

import React from "react";
import { Zap, Shield, Crown, ArrowRight } from "lucide-react";

const BrandStoryPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-cyan-500/30">
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-100"></div>

        {/* Animated Storm Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full animate-pulse delay-1000 opacity-40"></div>

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-50 w-full flex justify-between items-center py-8 px-8 md:px-12 border-b border-white/5 backdrop-blur-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            ICEMPIRE
          </h1>
          <span className="text-[10px] text-gray-500 tracking-[0.4em] mt-1 uppercase">
            Dominion Established 2025
          </span>
        </div>

        {/* Simple Nav Indicator */}
        <div className="hidden md:flex items-center gap-4 text-xs font-bold tracking-widest text-gray-500">
          <span className="text-white">04</span>
          <span className="h-[1px] w-12 bg-gray-700"></span>
          <span>BRAND STORY</span>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16">
        {/* LEFT COLUMN: Visual / Manifesto Title */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-2xl">
              Forged <br />
              In The <br />
              <span className="text-cyan-400/90 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                Storm
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-[2px] w-20 bg-cyan-500"></div>
              <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-bold">
                The Icempire Philosophy
              </p>
            </div>
          </div>

          {/* Decorative Background Element behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl -z-10 rounded-full"></div>
        </div>

        {/* RIGHT COLUMN: The Story (Glass Card) */}
        <div className="w-full md:w-1/2">
          <div className="relative group">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
              <Zap className="w-10 h-10 text-cyan-400 mb-8 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg md:text-xl">
                <p>
                  <strong className="text-white font-bold">Icempire</strong> is
                  not merely a label; it is a declaration of sovereignty. In a
                  world of fleeting trends and quiet conformists, we construct
                  armor for the vanguard.
                </p>
                <p>
                  We believe that style is a weapon. It commands attention,
                  demands respect, and silences the noise. Our collections are
                  born from the chaotic beauty of the storm—sharp, electric, and
                  undeniable.
                </p>
                <p>
                  Every stitch is calculated. Every cut is precise. We do not
                  dress the crowd; we dress the rulers of the new age.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-8">
                {/* Value 1 */}
                <div className="flex flex-col gap-2">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                    Resilience
                  </span>
                </div>
                {/* Value 2 */}
                <div className="flex flex-col gap-2">
                  <Crown className="w-5 h-5 text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                    Dominion
                  </span>
                </div>
                {/* Value 3 */}
                <div className="flex flex-col gap-2">
                  <Zap className="w-5 h-5 text-gray-500" />
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                    Power
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
        </div>
      </main>
    </div>
  );
};

export default BrandStoryPage;
