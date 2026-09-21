"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  "ESCAPES",
  "TRAVELLER STORIES",
  "HIDDEN GEMS",
  "SIGNATURE JOURNEYS",
  "MEMORIES"
];

export function VaultCategories() {
  return (
    <section className="w-full py-12 md:py-20 border-b border-white/5 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
        <ul className="flex items-center justify-between min-w-max gap-8 md:gap-12 lg:gap-16">
          {CATEGORIES.map((category, index) => (
            <motion.li 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <button className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-500 font-light group relative">
                {category}
                <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-white group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
