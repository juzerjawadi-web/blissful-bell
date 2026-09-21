"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { Sparkles, Loader2 } from "lucide-react";

const LOADING_STEPS = [
  "Integrating Google Research...",
  "Analyzing compatibility matrix...",
  "Running cosmic algorithms...",
  "Syncing heartbeats..."
];

export function LoveSync() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [sync, setSync] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (isCalculating) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isCalculating]);

  const calculateSync = () => {
    if (!name1 || !name2) return;
    setIsCalculating(true);
    setLoadingStep(0);
    setSync(null);

    setTimeout(() => {
      const n1 = name1.toLowerCase().trim();
      const n2 = name2.toLowerCase().trim();
      
      // Easter egg for the perfect match
      const isPerfectMatch = 
        (n1.includes("durriya") && n2.includes("juzer")) || 
        (n1.includes("juzer") && n2.includes("durriya"));

      if (isPerfectMatch) {
        setSync(100);
      } else {
        // Deterministic hash based on the letters
        const combined = n1 + n2;
        let score = 0;
        for (let i = 0; i < combined.length; i++) {
          score += combined.charCodeAt(i);
        }
        // Normalize between 60 and 99 for other names
        setSync((score % 40) + 60);
      }
      setIsCalculating(false);
    }, 3500); // 3.5 seconds of "research"
  };

  return (
    <GlassCard className="p-8 w-full max-w-sm mx-auto flex flex-col items-center min-h-[420px] justify-center">
      <div className="flex items-center gap-2 mb-8 text-pastel-lavender/80">
        <Sparkles size={16} />
        <h2 className="text-sm tracking-[0.2em] font-medium">LOVE SYNC</h2>
      </div>

      <AnimatePresence mode="wait">
        {!sync && !isCalculating ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full space-y-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl">😌</span>
              <input
                type="text"
                placeholder="You"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="flex-1 bg-transparent border-b border-white/20 focus:border-pastel-lavender/50 outline-none px-2 py-2 text-white/90 placeholder:text-white/20 transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl">🫶</span>
              <input
                type="text"
                placeholder="Them"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="flex-1 bg-transparent border-b border-white/20 focus:border-pastel-lavender/50 outline-none px-2 py-2 text-white/90 placeholder:text-white/20 transition-colors"
              />
            </div>
            <button
              onClick={calculateSync}
              disabled={!name1 || !name2}
              className="w-full mt-6 py-3 border border-white/10 hover:bg-white/5 rounded-2xl transition-colors text-xs tracking-widest text-white/70 disabled:opacity-50"
            >
              CALCULATE
            </button>
          </motion.div>
        ) : isCalculating ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-6 w-full"
          >
            <Loader2 className="w-8 h-8 text-pastel-lavender animate-spin" />
            <motion.p 
              key={loadingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] tracking-widest text-white/50 uppercase text-center"
            >
              {LOADING_STEPS[loadingStep]}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Animated Ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-white/10"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: `${((sync as number) / 100) * 553} 1000` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-pastel-lavender/60"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-5xl font-serif text-white font-light tracking-wider">
                {sync}%
              </div>
            </div>
            
            <p className="mt-8 text-sm text-white/60 tracking-wide text-center max-w-[200px]">
              {sync === 100 
                ? "\"Mathematically, scientifically, and cosmically perfect.\"" 
                : "\"Apparently, you two are dangerously adorable.\""}
            </p>

            <button
              onClick={() => setSync(null)}
              className="mt-6 text-[10px] tracking-widest text-white/30 hover:text-white/60"
            >
              RECALCULATE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
