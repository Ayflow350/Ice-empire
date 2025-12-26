"use client";

import React, { useState } from "react";
import { ArrowRight, Layers, ChevronRight, Zap } from "lucide-react";

const CollectionPage = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const collections = [
    {
      id: 1,
      title: "Midnight Vanguard",
      subtitle: "Men's Outerwear",
      year: "DROP 01",
      image: "/clothes/001.jpg", // Dark fashion
    },
    {
      id: 2,
      title: "Neon Valkyrie",
      subtitle: "Women's Techwear",
      year: "DROP 02",
      image: "/clothes/002.jpg", // Futuristic fashion
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
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans text-white selection:bg-cyan-500/30">
      {/* ================= BACKGROUND AMBIENCE (Synced with Page 4) ================= */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-100"></div>

        {/* Animated Storm Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full animate-pulse delay-1000 opacity-40"></div>

        {/* Noise Texture Overlay (Exact match) */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* ================= HEADER (Synced Style) ================= */}
      <div className="h-40"></div>
      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col h-full">
        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-lg">
              The <br />
              <span className="text-cyan-400/90 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Archives
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-400/80 pb-2">
            <Layers className="w-4 h-4" />
            <span>Select Your Armor</span>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[60vh]">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group relative h-[50vh] md:h-full w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-500/50 transition-all duration-700"
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Background Image with Desaturation Effect */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                {/* Top Tag */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-[0.2em] text-gray-300 uppercase bg-black/30 backdrop-blur-md group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-colors duration-500">
                    {item.year}
                  </span>
                  <Zap className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
                </div>

                {/* Bottom Info */}
                <div>
                  <span className="block text-xs text-cyan-400 tracking-[0.3em] uppercase mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.subtitle}
                  </span>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-cyan-50 drop-shadow-lg">
                    {item.title}
                  </h3>

                  {/* CTA Button */}
                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-gray-400 group-hover:text-white transition-colors duration-300">
                    <div className="h-[1px] w-8 bg-gray-600 group-hover:bg-cyan-400 transition-colors"></div>
                    <span>View Drop</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Electric Glow Border on Hover */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-cyan-500/20 rounded-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= DECORATIVE GRID FOOTER (Synced) ================= */}
      <div className="absolute bottom-0 w-full h-32 border-t border-white/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(6,182,212,0.05))] pointer-events-none">
        <div
          className="w-full h-full opacity-20"
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
