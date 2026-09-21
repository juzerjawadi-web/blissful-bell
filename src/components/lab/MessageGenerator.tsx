"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { Copy, Check, Sparkles, MessageCircleHeart } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "I MISS YOU",
  "I LOVE YOU",
  "GOOD MORNING",
  "GOOD NIGHT",
  "SORRY",
  "JUST BECAUSE"
];

import MESSAGES from "../../data/messages.json";

const getRandomMessage = (options: string[]) => options[Math.floor(Math.random() * options.length)];

export function MessageGenerator() {
  const [message, setMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const messagesDict = MESSAGES as Record<string, string[]>;

  const handleGenerate = (category: string) => {
    const options = messagesDict[category];
    if (!options) return;
    setActiveCategory(category);
    setMessage(getRandomMessage(options));
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (message) {
      navigator.clipboard.writeText(message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <GlassCard interactive className="p-8 md:p-10 w-full max-w-2xl mx-auto border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 mb-8 relative z-10"
      >
        <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-2">
          <MessageCircleHeart className="w-6 h-6 text-pink-400" />
        </div>
        <h2 className="text-2xl font-serif text-white/90 font-light text-center tracking-wide">Tell them something...</h2>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="flex flex-wrap gap-3 justify-center mb-10 relative z-10"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <motion.button
              key={cat}
              variants={{
                hidden: { opacity: 0, y: 10, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenerate(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs tracking-[0.15em] transition-all duration-300 border backdrop-blur-sm",
                isActive 
                  ? "bg-pink-500/20 text-white border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
                  : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/30"
              )}
            >
              {cat}
            </motion.button>
          )
        })}
      </motion.div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {message ? (
            <motion.div
              key={message}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-10 min-h-[200px] flex items-center justify-center text-center group shadow-xl backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <Sparkles className="absolute top-6 left-6 w-4 h-4 text-white/20" />
              <Sparkles className="absolute bottom-6 right-6 w-4 h-4 text-white/20" />

              <p className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-lg text-center drop-shadow-sm font-light">
                &quot;{message}&quot;
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className={cn(
                  "absolute bottom-6 right-6 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm",
                  isCopied 
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 opacity-100" 
                    : "bg-white/5 text-white/40 border-white/10 hover:text-white/90 hover:bg-white/10 hover:border-white/30 opacity-0 group-hover:opacity-100"
                )}
                title="Copy Message"
              >
                <span className="text-[10px] tracking-widest font-medium uppercase">
                  {isCopied ? "Copied" : "Copy"}
                </span>
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border-2 border-dashed border-white/10 p-10 min-h-[200px] flex items-center justify-center bg-transparent"
            >
              <motion.span 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-sm text-white/30 tracking-[0.2em] font-light uppercase"
              >
                Awaiting Inspiration...
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
