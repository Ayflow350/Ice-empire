import Link from "next/link";
import React from "react";

const TriggerStorm = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 1. Background Video 
          Note: I have included a direct link to a free Pexels storm video for the demo. 
          You can replace the 'src' string with your own local video file path later. 
      */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/storm.mp4" // <--- Updated to local path
        poster="/iceempire hero image.jpg"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 2. Dark Overlay 
          This semi-transparent layer sits on top of the video to make the text pop.
      */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* 3. Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-4 text-center">
        {/* Main Headline */}
        <h1
          className="text-white font-bold uppercase tracking-tighter 
                       text-5xl md:text-7xl lg:text-8xl 
                       drop-shadow-lg mb-8"
        >
          Trigger The Storm
        </h1>

        {/* Action Button */}
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
