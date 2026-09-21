"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GlassCard } from "../global/GlassCard";
import { Sparkles, X } from "lucide-react";

const BUBBLES = [
  "MEMORIES",
  "SMILES",
  "WORDS",
  "MOMENTS",
  "DREAMS",
  "PROMISES",
];

const BUBBLE_MESSAGES: Record<string, string> = {
  MEMORIES: "Maybe one day we'll forget the exact dates and little details...\n\nbut I hope we'll always remember how these moments felt.\n\nEvery tiny thing I remember about you—the way you laugh at my silly jokes, the small habits you have when you're thinking, the quiet comfort of just being near you—these are the things that mean everything to me. I want to collect a lifetime of these ordinary, perfect memories with you. So that one day, we can look back and smile at the beautiful life we experienced together.",
  SMILES: "Your smile just keeps getting better and better for me.\n\nI swear, I could do almost anything just to bring that smile back to your face. Every single penny I spend on you, every bouquet I bring, every piece of jewellery, every brownie I make, every chicken I cook — all of it feels completely worth it when I see you smile.\n\nYour smile is honestly one of the cutest and most perfect things in my world.\n\nIf I can be even a small reason behind that smile, then every bit of my sweat, effort and energy is worth it.",
  WORDS: "Chunnari Chunnari.\n\nAnd chicken.\n\nSome words don't need an explanation.\n\nYou just know.",
  MOMENTS: "I don't only want the big moments with you. I want the ordinary ones too.\n\nThe ones where we're just laughing over nothing, cooking together and making a mess, or just sitting in comfortable silence. It's those random conversations and quiet afternoons that I value the most, simply because I'm spending them with you. Every single ordinary moment becomes something I treasure, just because you are in it.",
  DREAMS: "For you, Duuri babes, I'll always find a way.\n\nWhatever you dream about, however big or impossible it may seem, I'll keep looking for a way to bring it a little closer to reality.\n\nBecause seeing you live the dreams in your head is something I would always want to be a part of.",
  PROMISES: "We've made promises to each other — and I don't want them to be just words we once said.\n\nI want us to invest our time, our energy, our patience and our hearts into making them real.\n\nWhatever I promise you, I want to keep finding ways to justify that promise through my actions.\n\nBecause a promise to you isn't something I want to simply make.\n\nIt's something I want to live."
};

export function PickABubble() {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveBubble(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-32 relative px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <Sparkles className="w-6 h-6 text-pastel-yellow/60 mx-auto mb-6" />
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 tracking-wide font-light">
          Pick a Bubble
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto relative z-10">
        {BUBBLES.map((bubble, i) => (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.8, x: i % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 60, damping: 12 }}
            className="cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.15)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveBubble(activeBubble === bubble ? null : bubble)}
              >
                <GlassCard variant="bubble" className="w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pastel-blue/10 via-transparent to-pastel-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {activeBubble === bubble && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse mix-blend-screen pointer-events-none" />
                  )}
                  <div className="flex-1 w-full h-full flex flex-col items-center justify-center">
                    <span className="relative z-10 text-[10px] md:text-xs tracking-[0.25em] text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-500">
                      {bubble}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeBubble && (
          <motion.div
            key={activeBubble}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl mx-auto mt-16 overflow-hidden relative z-10"
          >
            <GlassCard variant="card" className="p-8 md:p-12 border border-white/20">
              {/* Subtle internal reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[2.5rem]" />
              
              <button 
                onClick={() => setActiveBubble(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center pt-4">
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-8 border-b border-white/10 pb-2">
                  {activeBubble}
                </span>
                <p className="font-serif text-lg md:text-xl text-white/90 leading-[1.8] md:leading-[2] whitespace-pre-wrap font-light tracking-wide drop-shadow-sm">
                  {BUBBLE_MESSAGES[activeBubble]}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
