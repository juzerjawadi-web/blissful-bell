"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoveNameMaker() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mood, setMood] = useState("pink");

  const generateName = () => {
    if (!name1 || !name2) return;
    setIsGenerating(true);
    
    // Playful mock algorithm
    setTimeout(() => {
      const half1 = name1.substring(0, Math.ceil(name1.length / 2));
      const half2 = name2.substring(Math.ceil(name2.length / 2));
      setResult((half1 + half2).toUpperCase());
      setIsGenerating(false);
    }, 2000);
  };

  const colors: Record<string, { bg: string, ring: string, shadow: string }> = {
    pink: { bg: "from-pink-500/20 to-rose-400/10", ring: "ring-pink-500/50", shadow: "shadow-pink-500/20" },
    lavender: { bg: "from-purple-500/20 to-indigo-400/10", ring: "ring-purple-500/50", shadow: "shadow-purple-500/20" },
    peach: { bg: "from-orange-400/20 to-amber-300/10", ring: "ring-orange-400/50", shadow: "shadow-orange-400/20" },
    blue: { bg: "from-cyan-500/20 to-blue-400/10", ring: "ring-cyan-500/50", shadow: "shadow-cyan-500/20" },
  };

  return (
    <GlassCard interactive className="p-8 md:p-10 w-full max-w-xl mx-auto flex flex-col items-center border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Decorative blurred blob behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-10 z-10"
      >
        <Sparkles className="w-5 h-5 text-pink-400/70" />
        <h2 className="text-3xl font-serif text-white/90 font-light tracking-wide">Love Name Maker</h2>
        <Sparkles className="w-5 h-5 text-pink-400/70" />
      </motion.div>

      <div className="w-full space-y-6 relative z-10">
        <AnimatePresence mode="wait">
          {!result && !isGenerating && (
            <motion.div 
              key="inputs"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="relative group">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="YOUR NAME"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50 outline-none px-6 py-4 text-center text-white/90 tracking-[0.2em] placeholder:text-white/20 transition-all hover:bg-white/10"
                />
              </div>
              
              <div className="relative flex justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative bg-transparent px-4">
                  <Heart className="w-4 h-4 text-white/20" />
                </div>
              </div>

              <div className="relative group">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="THEIR NAME"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50 outline-none px-6 py-4 text-center text-white/90 tracking-[0.2em] placeholder:text-white/20 transition-all hover:bg-white/10"
                />
              </div>
              
              <motion.button
                whileHover={name1 && name2 ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" } : {}}
                whileTap={name1 && name2 ? { scale: 0.98 } : {}}
                onClick={generateName}
                disabled={!name1 || !name2}
                className="mt-6 py-4 w-full rounded-xl bg-white/10 border border-white/20 transition-all text-sm tracking-widest text-white/90 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,192,203,0.15)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                CREATE OUR LOVE NAME
              </motion.button>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col justify-center items-center h-[280px] gap-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-pink-500/30 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-16 h-16 text-pink-400 fill-pink-400/20" />
                </motion.div>
              </div>
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/50 tracking-[0.3em] text-xs uppercase"
              >
                Mixing magic...
              </motion.span>
            </motion.div>
          )}

          {result && !isGenerating && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} 
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center justify-center gap-8 py-4"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "relative w-72 h-72 rounded-[40px] flex items-center justify-center p-8 text-center",
                  "bg-gradient-to-tr border border-white/20 backdrop-blur-md shadow-2xl transition-colors duration-700",
                  colors[mood].bg,
                  colors[mood].shadow
                )}
              >
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10 rounded-[32px] pointer-events-none" />
                <div className="flex flex-col items-center gap-4">
                  <span className="text-4xl font-serif text-white tracking-[0.15em] drop-shadow-md">{result}</span>
                  <Heart className="w-5 h-5 text-white/50" />
                </div>
              </motion.div>
              
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Change Vibe</span>
                <div className="flex gap-4 p-2 rounded-full bg-black/20 border border-white/5">
                  {Object.entries(colors).map(([m, { bg, ring }]) => (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      key={m}
                      onClick={() => setMood(m)}
                      className={cn(
                        "w-8 h-8 rounded-full bg-gradient-to-tr border transition-all duration-300",
                        bg,
                        mood === m ? `border-white/80 ring-2 ring-offset-2 ring-offset-transparent ${ring}` : 'border-white/20 hover:border-white/50'
                      )}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, color: "rgba(255,255,255,1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setResult(null); setName1(""); setName2(""); }}
                className="text-xs tracking-[0.2em] text-white/50 transition-colors mt-2 uppercase flex items-center gap-2"
              >
                Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

