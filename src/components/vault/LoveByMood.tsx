"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const MOODS = [
  { id: 1, name: "FALLING", desc: "For new love." },
  { id: 2, name: "LONGING", desc: "For when they're far away." },
  { id: 3, name: "FOREVER", desc: "Stories about lasting love." },
  { id: 4, name: "HEARTBREAK", desc: "For the love that hurts." },
  { id: 5, name: "MIDNIGHT", desc: "For 2 AM thoughts." },
  { id: 6, name: "HOPE", desc: "For love that hasn't arrived yet." }
];

export function LoveByMood() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax move up as we scroll down
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="w-full min-h-screen py-32 relative z-10 flex flex-col justify-center overflow-hidden" id="mood">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, willChange: "transform" }} className="absolute -inset-y-[20%] inset-x-0 z-0">
        <Image 
          src="/girl.png" 
          fill 
          alt="Girl" 
          className="object-cover" 
          priority
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-24 drop-shadow-2xl">
          <h2 className="text-sm tracking-[0.2em] text-white uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">05 — Love by Mood</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">How does your heart feel?</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {MOODS.map((mood, idx) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              className="w-32 h-32 md:w-48 md:h-48 glass-bubble flex flex-col items-center justify-center p-4 group hover:brightness-110 transition-all shadow-2xl relative overflow-hidden backdrop-blur-md bg-black/20"
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
              
              <span className="text-[10px] tracking-widest uppercase text-pastel-lavender/60 mb-2">♡</span>
              <h4 className="text-xs md:text-sm tracking-[0.2em] text-white/90 uppercase mb-2">{mood.name}</h4>
              <p className="text-[9px] md:text-[10px] text-white/40 text-center tracking-wider px-2">{mood.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
