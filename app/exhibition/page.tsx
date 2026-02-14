"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  Ticket,
  Circle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const ExhibitionPage = () => {
  // ================= DATA (Updated for Professional Tone) =================
  const exhibitions = [
    {
      id: 1,
      title: "Entropy: First Drop",
      location: "Shibuya, Tokyo",
      date: "OCT 2024",
      status: "Archived",
      coordinates: "35.6591° N, 139.7006° E",
      image: "/exhibition/tokyo.jpg",
      description:
        "The genesis of our design language. A study in chaotic minimalism presented to an exclusive audience of 500 in the heart of Tokyo.",
    },
    {
      id: 2,
      title: "Static Void",
      location: "SoHo, New York",
      date: "JAN 2025",
      status: "Archived",
      coordinates: "40.7233° N, 74.0030° W",
      image: "/exhibition/nyc.jpg",
      description:
        "An immersive audio-visual installation utilizing stark lighting to highlight texture and form. The collection sold out in 4 minutes.",
    },
    {
      id: 3,
      title: "Protocol: Zero",
      location: "The Tate, London",
      date: "MAR 2026",
      status: "Open Now",
      coordinates: "51.5076° N, 0.0994° W",
      image: "/exhibition/london.jpg",
      description:
        "Current installation. A brutalist exploration of fabric resilience. Open to the public for a limited engagement until the end of the month.",
    },
    {
      id: 4,
      title: "Eclipse Theory",
      location: "Paris, France",
      date: "DEC 2026",
      status: "Upcoming",
      coordinates: "48.8566° N, 2.3522° E",
      image: "/exhibition/paris.jpg",
      description:
        "The next evolution. This upcoming showcase will introduce our new winter silhouette. Invitations will be sent shortly.",
    },
  ];

  // ================= STATE =================
  const [activeItem, setActiveItem] = useState(exhibitions[2]); // Default to the 'Open Now' one

  return (
    <div className="relative min-h-screen w-full bg-black font-sans text-white selection:bg-zinc-500/30">
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black"></div>

        {/* Ash Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-800/10 blur-[120px] rounded-full animate-pulse"></div>

        {/* Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="h-24 md:h-32"></div>

      {/* ================= MAIN LAYOUT ================= */}
      <main className="relative z-10 container mx-auto px-6 h-full pb-20">
        {/* Header & Return Button */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* ADDED: Return Button */}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-white animate-pulse rounded-full"></div>
              <span className="text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase">
                Global Installations
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
              The Exhibitions
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-1">
              Local Time:
            </p>
            <p className="text-sm font-mono text-white">
              {new Date().toLocaleTimeString("en-US", { hour12: false })}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* LEFT COLUMN: THE LIST (Interactive) */}
          <div className="w-full lg:w-5/12 space-y-2">
            {exhibitions.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                className={`group relative p-8 border-l-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeItem.id === item.id
                    ? "border-white bg-white/[0.03]"
                    : "border-white/10 hover:border-zinc-500 bg-transparent"
                }`}
              >
                {/* Hover Flash Effect */}
                <div
                  className={`absolute inset-0 bg-white/5 transform transition-transform duration-500 origin-left ${
                    activeItem.id === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase mb-3 ${
                        item.status === "Open Now"
                          ? "bg-white text-black"
                          : item.status === "Upcoming"
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-transparent border border-white/20 text-zinc-500"
                      }`}
                    >
                      {item.status === "Open Now" && (
                        <Circle className="w-2 h-2 fill-black animate-pulse" />
                      )}
                      {item.status}
                    </div>

                    <h3
                      className={`text-2xl font-black uppercase tracking-tight mb-2 transition-colors ${
                        activeItem.id === item.id
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div className="flex flex-col gap-1 text-xs text-zinc-500 font-mono">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 transition-all duration-500 ${
                      activeItem.id === item.id
                        ? "text-white rotate-0 opacity-100"
                        : "text-zinc-600 rotate-45 opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: THE VISUAL (Sticky) */}
          <div className="w-full lg:w-7/12 relative lg:h-[60vh] h-[50vh] sticky top-24">
            {/* Visual Frame */}
            <div className="relative w-full h-full border border-white/10 p-2 rounded-sm bg-zinc-900/50 backdrop-blur-sm">
              {/* The Dynamic Image */}
              <div className="relative w-full h-full overflow-hidden bg-black">
                {/* Map Overlay Grid */}
                <div
                  className="absolute inset-0 z-20 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                ></div>

                <img
                  key={activeItem.id} // Forces re-render for animation
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover opacity-60 grayscale scale-110 animate-[slowZoom_10s_linear_infinite]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10"></div>

                {/* Information Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-white/20"></div>

                    <div className="flex justify-between items-end">
                      <div className="max-w-md">
                        <p className="text-zinc-400 font-mono text-xs mb-2">
                          {activeItem.coordinates}
                        </p>
                        <p className="text-white text-sm md:text-base font-light leading-relaxed">
                          {activeItem.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      {activeItem.status !== "Archived" && (
                        <button className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm hover:bg-zinc-300 transition-colors">
                          <span className="text-xs font-black uppercase tracking-widest">
                            {activeItem.status === "Open Now"
                              ? "Get Tickets"
                              : "Join Waitlist"}
                          </span>
                          <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-white/30 z-20"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/30 z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
};

export default ExhibitionPage;
