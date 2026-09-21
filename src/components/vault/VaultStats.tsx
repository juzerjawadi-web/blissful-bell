"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "1000+", label: "Travellers" },
  { value: "50+", label: "Destinations" },
  { value: "10+", label: "Years of Experiences" },
  { value: "∞", label: "Memories" }
];

export function VaultStats() {
  return (
    <section className="w-full py-24 md:py-32 border-y border-white/5 relative z-10 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 tracking-wider font-light">
                {stat.value}
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
