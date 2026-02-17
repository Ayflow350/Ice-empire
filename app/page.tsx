"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

const TriggerStorm = () => {
  // 1. TS FIX: Explicitly type the ref as HTMLVideoElement
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    // 2. TS FIX: Check if video exists (is not null) before accessing properties
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      video.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/storm.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        // We removed 'webkit-playsinline' to prevent TS warnings,
        // as 'playsInline' covers modern iOS devices.
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4 text-center">
        <Link
          href="/Gate"
          className="group relative px-8 py-4 border border-white 
                     text-white uppercase tracking-[0.2em] text-sm md:text-base font-medium
                     transition-all duration-300 ease-out 
                     hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          <span className="relative z-10">Trigger The Storm</span>
        </Link>
      </div>
    </div>
  );
};

export default TriggerStorm;
