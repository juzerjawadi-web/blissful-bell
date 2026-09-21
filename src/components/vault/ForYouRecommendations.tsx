"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { BOOKS, SONGS, POEMS, LETTERS } from "@/data/vault";
import { Sparkles, ArrowRight } from "lucide-react";

export function ForYouRecommendations() {
  const [comboId, setComboId] = useState(0);

  // We randomize on click. In a real app with many items, this is fine.
  const book = BOOKS[comboId % BOOKS.length];
  const song = SONGS[comboId % SONGS.length];
  const poem = POEMS[comboId % POEMS.length];
  const letter = LETTERS[comboId % LETTERS.length];

  return (
    <section className="w-full py-32 relative z-10" id="foryou">
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">07 — For You</h2>
        <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4">A Little Something For You</h3>
        <p className="text-white/60 tracking-wider text-sm max-w-md mx-auto mb-12">
          We found something that feels like you.
        </p>

        <button 
          onClick={() => setComboId(prev => prev + 1)}
          className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-full text-xs tracking-widest uppercase text-white transition-all flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-4 h-4" />
          Surprise Me ♡
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={comboId}
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
        >
          {/* Tonight's Book */}
          <GlassCard className="p-6 flex flex-col group">
            <span className="text-[9px] tracking-widest text-pastel-lavender/60 uppercase mb-8 block">Tonight&apos;s Book</span>
            <h4 className="font-serif text-xl text-white/90 mb-2">{book.title}</h4>
            <p className="text-xs text-white/50 italic mb-auto">The book that understands your heart.</p>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </GlassCard>

          {/* Tonight's Song */}
          <GlassCard className="p-6 flex flex-col group">
            <span className="text-[9px] tracking-widest text-pastel-lavender/60 uppercase mb-8 block">Tonight&apos;s Song</span>
            <h4 className="font-serif text-xl text-white/90 mb-2">{song.title}</h4>
            <p className="text-xs text-white/50 italic mb-auto">The song you didn&apos;t know you needed.</p>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </GlassCard>

          {/* Tonight's Poem */}
          <GlassCard className="p-6 flex flex-col group">
            <span className="text-[9px] tracking-widest text-pastel-lavender/60 uppercase mb-8 block">Tonight&apos;s Poem</span>
            <h4 className="font-serif text-xl text-white/90 mb-2">&quot;{poem.lines[0]}...&quot;</h4>
            <p className="text-xs text-white/50 italic mb-auto">Three lines that might stay with you.</p>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </GlassCard>

          {/* Tonight's Letter */}
          <GlassCard className="p-6 flex flex-col group">
            <span className="text-[9px] tracking-widest text-pastel-lavender/60 uppercase mb-8 block">Tonight&apos;s Letter</span>
            <h4 className="font-serif text-xl text-white/90 mb-2">{letter.title}</h4>
            <p className="text-xs text-white/50 italic mb-auto">Words someone might have written for you.</p>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
