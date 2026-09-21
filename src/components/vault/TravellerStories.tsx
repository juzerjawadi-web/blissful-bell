"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/global/GlassCard";

export function TravellerStories() {
  return (
    <section className="w-full py-32 px-4 relative z-10 bg-black overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-xs tracking-[0.4em] text-white/50 uppercase mb-8">Traveller Stories</h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-light tracking-wide leading-tight italic opacity-90">
            "More than a holiday.<br/>A memory we still talk about."
          </h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GlassCard variant="card" className="p-8 md:p-12 max-w-2xl mx-auto relative group">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full overflow-hidden border border-white/20">
                <Image 
                  src="/juzer-and-durriya.png" 
                  alt="Happy Holidays Traveller" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className="text-xl font-serif text-white tracking-widest mb-2">JUZER & DURRIYA</h4>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40 uppercase mb-6">
                  <span>Bali</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Aug 2024</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>Couple</span>
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed font-light mb-8 italic">
                  From the slow mornings overlooking the wild landscapes to the unforgettable nights under the stars, every moment felt curated just for us. It wasn't just a trip; it was the beginning of our forever.
                </p>
                
                <button className="text-[10px] tracking-[0.3em] text-white uppercase hover:text-pastel-pink transition-colors border-b border-white/30 hover:border-pastel-pink pb-1">
                  View Journey
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
