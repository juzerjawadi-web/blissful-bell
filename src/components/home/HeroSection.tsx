"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { GlassCard } from "@/components/global/GlassCard";
import { TextShimmerWave } from "@/components/core/text-shimmer-wave";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<{
    initY: number; initX: number; initOpacity: number; initScale: number;
    animY: number; animOpacity: number; duration: number;
  }[]>([]);

  // Compositor-driven motion values prevent full component re-renders during mouse moves
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const bubble1X = useTransform(springX, (val) => val * -20);
  const bubble1Y = useTransform(springY, (val) => val * -20);

  const bubble2X = useTransform(springX, (val) => val * 30);
  const bubble2Y = useTransform(springY, (val) => val * 30);

  const cardRotateX = useTransform(springY, (val) => val * 5);
  const cardRotateY = useTransform(springX, (val) => val * -5);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    setParticles(Array.from({ length: 15 }).map(() => ({
      initY: Math.random() * window.innerHeight,
      initX: Math.random() * window.innerWidth,
      initOpacity: Math.random() * 0.5 + 0.1,
      initScale: Math.random() * 0.5 + 0.5,
      animY: Math.random() * window.innerHeight,
      animOpacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 10
    })));
  }, []);
  
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background inside Hero Section */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hair_flowing.mp4" type="video/mp4" />
        </video>
        {/* Subtle fade out at the bottom so it blends into the rest of the page naturally */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Floating Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{
            x: bubble1X,
            y: bubble1Y,
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-pink/10 rounded-full blur-[100px] mix-blend-screen will-change-transform"
        />
        <motion.div
          style={{
            x: bubble2X,
            y: bubble2Y,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-lavender/10 rounded-full blur-[120px] mix-blend-screen will-change-transform"
        />
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Floating Glass Container for Name */}
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ 
            perspective: 1000,
            rotateX: cardRotateX,
            rotateY: cardRotateY,
          }}
          className="glass-card px-12 py-8 mb-8 rounded-[2rem] border border-white/10 will-change-transform"
        >
          <h1 className="font-[var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-pastel-pink/50 drop-shadow-sm font-light uppercase flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <TextShimmerWave duration={2}>DURRIYA</TextShimmerWave>
            <TextShimmerWave duration={2}>JUZER</TextShimmerWave>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <GlassCard className="px-12 py-8 mb-8 border border-white/10" variant="card">
            <p className="text-sm md:text-base tracking-[0.3em] text-white/70 uppercase">
              <TextShimmerWave duration={2}>Welcome to our universe</TextShimmerWave>
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-4 text-xs md:text-sm text-pastel-pink/60 tracking-[0.2em] font-[var(--font-manrope)] font-light flex-wrap justify-center"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♡
          </motion.span>
          <TextShimmerWave duration={2}>somewhere between you and me</TextShimmerWave>
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            ♡
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Tiny particles */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: p.initY, 
                x: p.initX,
                opacity: p.initOpacity,
                scale: p.initScale
              }}
              animate={{ 
                y: [null, p.animY],
                opacity: [null, p.animOpacity],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            />
          ))}
        </div>
      )}
    </section>
  );
}
