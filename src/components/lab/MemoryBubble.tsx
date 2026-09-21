"use client";

import { useState } from "react";
import { GlassCard } from "@/components/global/GlassCard";
import { motion, AnimatePresence } from "framer-motion";

export function MemoryBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center py-20 relative">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateX: [0, 5, -5, 0],
                rotateY: [0, -5, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full glass-bubble flex flex-col items-center justify-center p-8 relative overflow-hidden group border border-white/20 shadow-[0_0_50px_rgba(255,182,217,0.1)] hover:shadow-[0_0_80px_rgba(255,182,217,0.2)] transition-shadow duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/10 via-transparent to-pastel-blue/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl mix-blend-screen" />
              
              <span className="relative z-10 text-xs md:text-sm font-medium tracking-[0.3em] text-white/80 text-center uppercase">
                Tap to reveal<br/>a memory
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <GlassCard
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="w-full aspect-[4/3] max-w-3xl rounded-[2rem] overflow-hidden relative"
            variant="card"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
            
            {/* Placeholder Image Layer - would be a real image */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <span className="text-white/10 text-sm tracking-widest">[MEMORY PHOTOGRAPH]</span>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              >
                Close
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-pastel-pink/80 tracking-widest text-sm mb-4">SEPTEMBER 14, 2024</p>
                <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-6">
                  &quot;Remember when...&quot;
                </h3>
                <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light">
                  That evening we just sat by the window watching the rain, and suddenly everything felt perfectly aligned.
                </p>
              </motion.div>
            </div>
          </GlassCard>
        )}
      </AnimatePresence>
    </div>
  );
}
