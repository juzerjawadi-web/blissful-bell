"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { LETTERS } from "@/data/vault";
import { useVault } from "./VaultContext";
import { Mail, MailOpen, Check } from "lucide-react";

export function LetterArchive() {
  const [openedLetters, setOpenedLetters] = useState<Record<string, boolean>>({});
  const [isWriting, setIsWriting] = useState(false);
  const [customLetter, setCustomLetter] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [isSealed, setIsSealed] = useState(false);
  const { saveItem, isSaved } = useVault();

  const toggleLetter = (id: string) => {
    setOpenedLetters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSeal = () => {
    if (!customLetter || !customTitle) return;
    setIsSealed(true);
    setTimeout(() => {
      setIsWriting(false);
      setIsSealed(false);
      setCustomLetter("");
      setCustomTitle("");
    }, 3000);
  };

  return (
    <section className="w-full py-24 relative z-10" id="letters">
      <div className="text-center mb-20">
        <h2 className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">04 — The Archive</h2>
        <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4">Letters Never Sent</h3>
        <p className="text-white/60 tracking-wider text-sm max-w-md mx-auto">
          Some things are easier to write than to say.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
        {LETTERS.map((letter) => (
          <GlassCard key={letter.id} className="p-8 flex flex-col group">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] tracking-widest text-white/40 uppercase">Letter {letter.id.replace('l', '00')}</span>
              {openedLetters[letter.id] ? (
                <MailOpen className="w-5 h-5 text-pastel-lavender/80" />
              ) : (
                <Mail className="w-5 h-5 text-white/30" />
              )}
            </div>
            
            <h4 className="font-serif text-2xl text-white/90 mb-2">{letter.title}</h4>
            <p className="text-sm text-white/50 italic mb-8">&quot;{letter.description}&quot;</p>

            <AnimatePresence>
              {openedLetters[letter.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8">
                    <p className="text-white/80 font-serif leading-relaxed text-lg whitespace-pre-wrap">
                      {letter.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => toggleLetter(letter.id)}
                className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {openedLetters[letter.id] ? "Fold Letter" : "Open Letter"}
              </button>
              
              {openedLetters[letter.id] && !isSaved(letter.id) && (
                <button
                  onClick={() => saveItem({ id: letter.id, type: "letter", title: letter.title, subtitle: "Unsent Letter" })}
                  className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                >
                  Save ♡
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Write Your Own */}
      <div className="max-w-2xl mx-auto text-center relative">
        {!isWriting ? (
          <button 
            onClick={() => setIsWriting(true)}
            className="px-8 py-4 border border-white/20 rounded-full text-xs tracking-widest uppercase text-white/80 hover:bg-white/5 hover:border-white/40 transition-all"
          >
            Leave something in the vault
          </button>
        ) : (
          <AnimatePresence mode="wait">
            {!isSealed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              >
                <GlassCard variant="card" className="p-8 border border-white/20 text-left">
                  <h4 className="font-serif text-2xl text-white/90 mb-6 text-center">Write a letter</h4>
                  <input 
                    type="text" 
                    placeholder="To..." 
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-2 mb-6 outline-none text-white/90 placeholder:text-white/30 focus:border-pastel-lavender/50 transition-colors"
                  />
                  <textarea 
                    placeholder="I don't know if you'll ever read this, but..."
                    value={customLetter}
                    onChange={(e) => setCustomLetter(e.target.value)}
                    className="w-full h-48 bg-transparent border border-white/10 rounded-xl p-4 mb-6 outline-none text-white/80 placeholder:text-white/20 focus:border-pastel-lavender/50 transition-colors resize-none font-serif"
                  />
                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => setIsWriting(false)}
                      className="px-6 py-2 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSeal}
                      disabled={!customLetter || !customTitle}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs tracking-widest uppercase text-white transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      Seal Letter ✦
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: -50 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center h-64"
              >
                <div className="w-16 h-16 bg-red-900/80 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                  <Check className="w-8 h-8 text-white/90" />
                </div>
                <p className="text-sm text-white/60 tracking-widest uppercase">
                  Letter sealed and sent to the archive.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
