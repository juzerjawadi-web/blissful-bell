"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SecretArchive() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="w-full py-48 relative z-10 flex flex-col items-center justify-center min-h-[50vh]" id="secret">
      {!unlocked ? (
        <div className="flex flex-col items-center opacity-30 hover:opacity-100 transition-opacity duration-1000">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-6">
            THERE&apos;S MORE DOWN HERE.
          </p>
          <button 
            onClick={() => setUnlocked(true)}
            className="text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
          >
            Unlock the secret archive
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-5xl font-serif text-white/90 font-light mb-12 tracking-wide">
              The Lost Love Archive
            </h3>
            
            <div className="flex flex-col gap-6 text-sm md:text-base text-white/50 tracking-widest uppercase font-light">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Forgotten poems.</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>Unsent letters.</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Songs from another time.</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>Stories that almost disappeared.</motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 3 }}
              className="mt-24 text-[9px] tracking-widest text-white/20 uppercase"
            >
              To be continued...
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
