"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export function TravelVaultHero({ onOpen }: { onOpen: () => void }) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsLoading(true);
    setTimeout(() => {
      onOpen();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/Modifying_hair_and_eyes_animation_202608111636.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText, willChange: "transform, opacity" }}
        className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-20"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.4em] text-white/70 uppercase mb-6 font-light"
        >
          A collection of places, moments & memories worth keeping.
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-widest mb-16 font-light drop-shadow-2xl"
        >
          THE VAULT
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={handleOpen}
          disabled={isLoading}
          className="relative group flex items-center justify-center overflow-hidden rounded-full p-px transition-all hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-white/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-spin-slow" />
          <div className="relative glass-bubble px-12 py-5 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-4 transition-all duration-500 group-hover:bg-black/20">
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="text-xs tracking-[0.3em] uppercase text-white/90">Open The Archive</span>
            )}
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
