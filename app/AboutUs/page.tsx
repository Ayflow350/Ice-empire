"use client";

import React from "react";
import { Zap, Shield, Crown } from "lucide-react";

const BrandStoryPage = () => {
  return (
    // CHANGED: Selection color to grey
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE (Obsidian & Bone) ================= */}
      <div className="absolute inset-0 z-0">
        {/* Deep Zinc/Black Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-100"></div>

        {/* CHANGED: Storm Glows to Ash/White */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-700/10 blur-[120px] rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full animate-pulse delay-1000 opacity-20"></div>

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* ================= HEADER SPACER ================= */}
      <div className="h-30"></div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16">
        {/* LEFT COLUMN: Visual / Manifesto Title */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-2xl">
              Forged <br />
              In The <br />
              {/* CHANGED: Highlight color to Bone (Zinc-300) with White Shadow */}
              <span className="text-zinc-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Storm
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-4">
              {/* CHANGED: Line color to Zinc */}
              <div className="h-[2px] w-20 bg-zinc-500"></div>
              {/* CHANGED: Text color to Zinc/Bone */}
              <p className="text-zinc-400 uppercase tracking-[0.3em] text-sm font-bold">
                The Icempire Philosophy
              </p>
            </div>
          </div>

          {/* CHANGED: Decorative Blur behind text to White/Grey */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-white/5 to-transparent blur-3xl -z-10 rounded-full"></div>
        </div>

        {/* RIGHT COLUMN: The Story (Glass Card) */}
        <div className="w-full md:w-1/2">
          <div className="relative group">
            {/* CHANGED: Glowing Border Effect to Monochromatic Ash */}
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 to-white/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
              {/* CHANGED: Icon Color to White */}
              <Zap className="w-10 h-10 text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

              <div className="space-y-6 text-zinc-300 font-light leading-relaxed text-lg md:text-xl">
                <p>
                  <strong className="text-white font-bold">Icempire</strong> is
                  not merely a label; it is a declaration of sovereignty. In a
                  world of fleeting trends and quiet conformists, we construct
                  armor for the vanguard.
                </p>
                <p>
                  We believe that style is a weapon. It commands attention,
                  demands respect, and silences the noise. Our collections are
                  born from the chaotic beauty of the storm sharp, electric, and
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
                  <Shield className="w-5 h-5 text-zinc-500" />
                  {/* CHANGED: Label Color to Bone/White */}
                  <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">
                    Resilience
                  </span>
                </div>
                {/* Value 2 */}
                <div className="flex flex-col gap-2">
                  <Crown className="w-5 h-5 text-zinc-500" />
                  <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">
                    Dominion
                  </span>
                </div>
                {/* Value 3 */}
                <div className="flex flex-col gap-2">
                  <Zap className="w-5 h-5 text-zinc-500" />
                  <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">
                    Power
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandStoryPage;
