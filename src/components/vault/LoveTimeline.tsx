"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    era: "1800s",
    title: "Letters & Longing",
    desc: "Jane Austen • Emily Brontë • Elizabeth Barrett Browning"
  },
  {
    era: "1900s",
    title: "Love Becomes Poetry",
    desc: "Pablo Neruda • F. Scott Fitzgerald • Rainer Maria Rilke"
  },
  {
    era: "2000s",
    title: "Love Becomes Stories",
    desc: "Nicholas Sparks • Jojo Moyes • John Green"
  },
  {
    era: "TODAY",
    title: "Love Becomes Everything",
    desc: "Songs. Messages. Films. Letters. Memories."
  }
];

export function LoveTimeline() {
  return (
    <section className="w-full py-32 relative z-10 overflow-hidden" id="timeline">
      <div className="text-center mb-24">
        <h2 className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">06 — Love Through Time</h2>
        <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4">An Evolution of Romance</h3>
      </div>

      {/* Horizontal Scrolling Timeline Container */}
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        {/* The timeline line */}
        <div className="absolute top-[80px] left-0 right-0 h-[1px] bg-white/10 hidden md:block" />

        <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-8">
          {TIMELINE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative flex-1 text-center md:text-left flex flex-col md:items-start items-center"
            >
              <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40 mb-8 md:mb-12 relative z-10 hidden md:block shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              
              <span className="text-[10px] tracking-[0.3em] uppercase text-pastel-lavender/80 mb-4 block">
                {item.era}
              </span>
              
              <h4 className="font-serif text-2xl text-white/90 mb-4">{item.title}</h4>
              <p className="text-xs text-white/50 tracking-wider leading-relaxed md:max-w-[200px] whitespace-pre-wrap">
                {item.desc.split(" • ").join("\n")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
