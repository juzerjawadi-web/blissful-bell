"use client";

import { motion } from "framer-motion";

export function VaultFooterCTA() {
  return (
    <section className="w-full py-40 md:py-64 relative z-10 bg-black overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white tracking-widest font-light mb-12">
          YOUR NEXT MEMORY <br className="hidden md:block" />
          BELONGS HERE.
        </h2>
        
        <button className="relative group overflow-hidden rounded-full p-px transition-transform hover:scale-105">
          <span className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-white/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-spin-slow" />
          <div className="relative px-10 py-4 bg-black rounded-full flex items-center justify-center transition-colors group-hover:bg-black/80">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/90">
              Begin Your Journey
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  );
}
