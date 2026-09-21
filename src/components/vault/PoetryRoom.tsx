"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POEMS } from "@/data/vault";
import { useVault } from "./VaultContext";
import { Heart, ArrowRight, Share } from "lucide-react";

export function PoetryRoom() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { saveItem, isSaved, removeItem } = useVault();
  
  const currentPoem = POEMS[currentIndex];
  const saved = isSaved(currentPoem.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % POEMS.length);
  };

  return (
    <section className="w-full min-h-screen relative bg-black flex flex-col items-center justify-center py-32 px-4" id="poetry">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent pointer-events-none z-0" />
      
      <div className="text-center relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-24">03 — The Poetry Room</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoem.id}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-col gap-4 mb-16">
              {currentPoem.lines.map((line, idx) => (
                <h3 key={idx} className="text-4xl md:text-6xl lg:text-7xl font-serif text-white/90 font-light tracking-wide leading-tight text-center">
                  “{line}”
                </h3>
              ))}
            </div>
            
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase mb-24">
              — {currentPoem.author}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-12 mt-auto">
          <button
            onClick={() => saved ? removeItem(currentPoem.id) : saveItem({ id: currentPoem.id, type: "poem", title: "Poem Fragment", subtitle: currentPoem.author })}
            className="flex flex-col items-center gap-2 group text-white/40 hover:text-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${saved ? "fill-white/80 text-white/80" : ""}`} />
            <span className="text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Save</span>
          </button>

          <button
            onClick={handleNext}
            className="flex flex-col items-center gap-2 group text-white/60 hover:text-white transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/5 group-hover:border-white/40 transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Next Poem</span>
          </button>

          <button className="flex flex-col items-center gap-2 group text-white/40 hover:text-white transition-colors">
            <Share className="w-5 h-5" />
            <span className="text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Share</span>
          </button>
        </div>
      </div>
    </section>
  );
}
