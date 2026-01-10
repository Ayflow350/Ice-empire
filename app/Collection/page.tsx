"use client";

import React, { useState } from "react";
import { ArrowRight, Layers, Zap } from "lucide-react";
import Link from "next/link";

const CollectionPage = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const collections = [
    {
      id: 1,
      title: "Midnight Vanguard",
      subtitle: "Men's Outerwear",
      year: "DROP 01",
      image: "/clothes/001.jpg",
    },
    {
      id: 2,
      title: "Neon Valkyrie",
      subtitle: "Women's Techwear",
      year: "DROP 02",
      image: "/clothes/002.jpg",
    },
    {
      id: 3,
      title: "Obsidian Relics",
      subtitle: "Accessories",
      year: "DROP 03",
      image: "/clothes/003.jpg",
    },
  ];

  return (
    // CHANGED: selection color to grey instead of cyan
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE (Ash & Obsidian) ================= */}
      <div className="absolute inset-0 z-0">
        {/* Deep obsidian gradient base */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-100"></div>

        {/* CHANGED: Animated Glows are now "Bone/Ash" (White/Grey) instead of Blue/Cyan */}
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
      <div className="h-40"></div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col h-full">
        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-lg">
              The <br />
              {/* CHANGED: "Ash Bone" Color (Zinc-300) with White Glow */}
              <span className="text-zinc-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Archives
              </span>
            </h2>
          </div>
          {/* CHANGED: Icon color to Zinc (Ash) */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-400 pb-2">
            <Layers className="w-4 h-4" />
            <span>Select Your Armor</span>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[60vh]">
          {collections.map((item) => (
            <div
              key={item.id}
              // CHANGED: Hover border color to Zinc/White
              className="group relative h-[50vh] md:h-full w-full rounded-sm overflow-hidden cursor-pointer border border-white/10 hover:border-zinc-300/40 transition-all duration-700"
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Background Image - High Contrast Grayscale */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Card Content */}
              <Link
                href="/ProductDetails"
                className="absolute inset-0 p-8 flex flex-col justify-between z-20"
              >
                {/* Top Tag */}
                <div className="flex justify-between items-start">
                  {/* CHANGED: Badge colors to Monochrome */}
                  <span className="px-3 py-1 border border-white/20 rounded-none text-[10px] tracking-[0.2em] text-zinc-400 uppercase bg-black/40 backdrop-blur-md group-hover:border-white/60 group-hover:text-white transition-colors duration-500">
                    {item.year}
                  </span>
                  {/* CHANGED: Zap Icon to White */}
                  <Zap className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
                </div>

                {/* Bottom Info */}
                <div>
                  {/* CHANGED: Subtitle to "Bone" (Zinc-300) */}
                  <span className="block text-xs text-zinc-300 tracking-[0.3em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.subtitle}
                  </span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-zinc-200 drop-shadow-lg">
                    {item.title}
                  </h3>

                  {/* CTA Button */}
                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors duration-300">
                    {/* CHANGED: Line color to White */}
                    <div className="h-[1px] w-8 bg-zinc-700 group-hover:bg-white transition-colors"></div>
                    <span>View Drop</span>
                    {/* CHANGED: Arrow color to White */}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-white" />
                  </div>
                </div>
              </Link>

              {/* CHANGED: Inner Border Glow to White/Ash */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-zinc-500/10 rounded-sm transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= DECORATIVE GRID FOOTER (Synced) ================= */}
      {/* CHANGED: Gradient to White/Grey instead of Cyan */}
      <div className="absolute bottom-0 w-full h-32 border-t border-white/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(255,255,255,0.02))] pointer-events-none">
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "100px 100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CollectionPage;
