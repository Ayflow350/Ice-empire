"use client";
import Link from "next/link";

import React, { useState } from "react";
import { ArrowRight, Zap } from "lucide-react";

const GenderGateway = () => {
  const [hoveredSide, setHoveredSide] = useState<"male" | "female" | null>(
    null
  );

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans text-white">
      {/* Background Ambience - Lightning/Storm feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"></div>
        {/* Subtle lightning flashes using gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
      </div>
      <div className="h-20"></div>
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-[80vh] flex flex-col">
        {/* Header / Brand */}

        {/* Central Gateway Title */}
        <div className="text-center mb-12 mt-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-lg">
            Select Your Path
          </h2>
          <p className="text-cyan-500/80 text-sm tracking-[0.3em] mt-2 uppercase">
            Define your dominion
          </p>
        </div>

        {/* The Gateway (Split Screen) */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">
          {/* MALE OPTION */}
          <div
            className={`group relative flex-1 h-[60vh] w-full md:w-auto border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] ${
              hoveredSide === "female" ? "opacity-40 scale-95" : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredSide("male")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            {/* Image Placeholder (Replace bg-color with actual image) */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-black group-hover:scale-105 transition-transform duration-700">
              {/* Simulating a silhouette image */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                <div className="w-48 h-96 bg-black rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

            {/* Content */}
            <Link
              href="/Collection"
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
            >
              <Zap
                className={`w-12 h-12 text-cyan-400 mb-4 transition-all duration-300 ${
                  hoveredSide === "male"
                    ? "opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,1)]"
                    : "opacity-0 scale-50"
                }`}
              />
              <h3 className="text-4xl md:text-6xl font-black tracking-widest text-white group-hover:text-cyan-100 transition-colors">
                MALE
              </h3>
              <span className="mt-4 px-6 py-2 border border-cyan-500/30 text-cyan-400 text-xs tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                ENTER DOMINION
              </span>
            </Link>

            {/* Electric Border Effect on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500"></div>
          </div>

          {/* CENTRE DIVIDER (Visual Only) */}
          <div className="hidden md:flex flex-col items-center justify-center h-full opacity-50">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            <div className="my-4 text-cyan-900 border border-cyan-900 rounded-full p-2">
              VS
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          </div>

          {/* FEMALE OPTION */}
          <div
            className={`group relative flex-1 h-[60vh] w-full md:w-auto border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] ${
              hoveredSide === "male" ? "opacity-40 scale-95" : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredSide("female")}
            onMouseLeave={() => setHoveredSide(null)}
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black group-hover:scale-105 transition-transform duration-700">
              {/* Simulating a silhouette image */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                <div className="w-48 h-96 bg-black rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <Zap
                className={`w-12 h-12 text-cyan-400 mb-4 transition-all duration-300 ${
                  hoveredSide === "female"
                    ? "opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,1)]"
                    : "opacity-0 scale-50"
                }`}
              />
              <h3 className="text-4xl md:text-6xl font-black tracking-widest text-white group-hover:text-cyan-100 transition-colors">
                FEMALE
              </h3>
              <span className="mt-4 px-6 py-2 border border-cyan-500/30 text-cyan-400 text-xs tracking-[0.2em] rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                ENTER DOMINION
              </span>
            </div>

            {/* Electric Border Effect on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500"></div>
          </div>
        </div>

        {/* Footer / Continue Button */}
        {/* <div className="mt-12 flex justify-center pb-8">
          <button className="group relative px-8 py-3 bg-transparent border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-white uppercase tracking-widest text-xs transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Continue Ahead{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-cyan-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div> */}
      </div>

      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
};

export default GenderGateway;
