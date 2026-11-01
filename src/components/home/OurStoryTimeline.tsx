"use client";

import { motion, useScroll } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { Heart } from "lucide-react";
import { useRef } from "react";

const TIMELINE = [
  { id: 1, title: "THE BEGINNING", date: "August 2024", memory: "When our paths first crossed in the most unexpected way.", photo: "" },
  { id: 2, title: "THE FIRST SMILE", date: "September 2024", memory: "That specific smile that made time stop for a second.", photo: "" },
  { id: 3, title: "THE MOMENT", date: "October 2024", memory: "The realization that this was something truly special.", photo: "" },
  { id: 4, title: "THE MEMORIES", date: "Current", memory: "Building our little universe, one day at a time.", photo: "" },
  { id: 5, title: "FOREVER", date: "Tomorrow & Beyond", memory: "To all the chapters we haven't written yet.", photo: "" },
];

export function OurStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  return (
    <section ref={containerRef} className="py-32 relative px-4 md:px-12 w-full">
      <div className="max-w-4xl mx-auto relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif text-white/90 mb-32 text-center tracking-wide font-light"
        >
          Our Story
        </motion.h2>

        {/* Vertical Line Container */}
        <div className="absolute left-[50%] top-[200px] bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block -translate-x-1/2 overflow-hidden">
          {/* Scroll Progress Filled Line - scaleY compositor transform eliminates scroll layout thrashing */}
          <motion.div 
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-white to-pastel-pink shadow-[0_0_10px_rgba(255,255,255,0.5)] will-change-transform"
          />
        </div>

        <div className="flex flex-col gap-24 md:gap-40 relative z-10">
          {TIMELINE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot for desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm border border-white/30 z-20">
                <div className="w-1.5 h-1.5 bg-pastel-pink rounded-full" />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="w-full md:w-1/2 relative group">
                {/* Connecting horizontal line to the dot */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-px bg-white/20 ${
                  index % 2 === 0 ? "-left-8" : "-right-8"
                }`} />

                <GlassCard className="p-8 md:p-12 w-full rounded-[2rem] flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative overflow-hidden group border-white/5 hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  
                  <Heart className="text-pastel-pink/50 w-6 h-6 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-pastel-blue/80 tracking-[0.2em] uppercase mb-8">
                    {item.date}
                  </p>
                  <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                    {item.memory}
                  </p>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
