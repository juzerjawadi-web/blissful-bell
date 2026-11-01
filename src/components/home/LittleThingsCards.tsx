"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlassCard } from "../global/GlassCard";

const THINGS = [
  { id: 1, text: "YOUR SMILE", yOffset: 20, xOffset: -10, delay: 0.1, image: "/IMG_20260630_120523.jpg" },
  { id: 2, text: "YOUR EYES", yOffset: -30, xOffset: 20, delay: 0.2, image: "/IMG_20260602_130344.jpg" },
  { id: 3, text: "YOUR VOICE", yOffset: 15, xOffset: 30, delay: 0.3, audio: "/voice.ogg" },
  { id: 4, text: "YOUR KINDNESS", yOffset: -20, xOffset: -25, delay: 0.4, image: "/20260208_073639.jpg" },
  { id: 5, text: "YOUR MADNESS", yOffset: 40, xOffset: 10, delay: 0.5, image: "/IMG_20260629_225155.jpg" },
  { id: 6, text: "THE WAY YOU LOOK AT ME", yOffset: -10, xOffset: 0, delay: 0.6, image: "/IMG_20260616_000622_684.webp" },
  { id: 7, text: "US", yOffset: 5, xOffset: -40, delay: 0.7, image: "/juzer-and-durriya.png" },
  { id: 8, text: "OUR MEMORIES", yOffset: -35, xOffset: -10, delay: 0.8, image: "/1760869483602.jpg" },
  { id: 9, text: "EVERY MOMENT", yOffset: 25, xOffset: 35, delay: 0.9, image: "/20260503_202503.jpg" },
];

import Image from "next/image";

function LittleThingCard({ thing }: { thing: { id: number; text: string; image?: string; audio?: string } }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cache bounds once on enter to avoid layout thrashing on every mousemove
    const rect = e.currentTarget.getBoundingClientRect();
    rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    x.set(0);
    y.set(0);
    setIsClicked(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newClickedState = !isClicked;
    setIsClicked(newClickedState);
    
    if (newClickedState && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else if (!newClickedState && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="w-full flex justify-center relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e) => {
        let rect = rectRef.current;
        if (!rect) {
          const r = e.currentTarget.getBoundingClientRect();
          rect = { left: r.left, top: r.top, width: r.width, height: r.height };
          rectRef.current = rect;
        }
        const xPct = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
        const yPct = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
        x.set(xPct);
        y.set(yPct);
      }}
      onClick={handleClick}
    >
      <GlassCard 
        interactive 
        className="px-6 py-4 flex items-center justify-center gap-3 relative z-20"
      >
        <span className="text-xs md:text-sm tracking-[0.2em] text-white/80 font-medium whitespace-nowrap">
          {thing.text}
        </span>
        <span className={`text-pastel-pink/50 text-sm transition-transform duration-500 ${isClicked ? "scale-125" : "group-hover:scale-125"}`}>♡</span>
      </GlassCard>

      {thing.audio && <audio ref={audioRef} src={thing.audio} preload="none" />}

      {thing.image && (
        <div 
          className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ease-out z-[9999] flex items-center justify-center perspective-[1200px] ${
            isClicked ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
          }`}
        >
          <motion.div 
            style={{ rotateX, rotateY }}
            className={`relative transition-transform duration-700 ease-out will-change-transform ${
              isClicked ? "scale-100" : "scale-95 md:group-hover:scale-100"
            }`}
          >
            <Image 
              src={thing.image} 
              alt={thing.text} 
              width={800}
              height={800}
              loading="lazy"
              sizes="(max-width: 768px) 90vw, 800px"
              style={{ width: "auto", height: "auto", maxWidth: "90vw", maxHeight: "80vh" }}
              className="object-contain rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function LittleThingsCards() {
  return (
    <section className="py-32 relative px-4 min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-24 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 tracking-wide font-light mb-4">
          Little Things
        </h2>
        <p className="text-white/50 tracking-widest text-sm">I LOVE ABOUT YOU</p>
      </motion.div>

      <div className="max-w-4xl mx-auto w-full relative h-[400px]">
        {THINGS.map((thing) => (
            <motion.div
              key={thing.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: thing.delay, duration: 0.8, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-auto px-4 md:px-0 hover:z-50 z-10"
              style={{ 
                marginTop: thing.yOffset * 3, 
                marginLeft: thing.xOffset * 8 
              }}
            >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, thing.id % 2 === 0 ? 1 : -1, 0],
              }}
              transition={{
                duration: 4 + (thing.id % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <LittleThingCard thing={thing} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
