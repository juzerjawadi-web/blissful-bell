"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LoveNameMaker } from "@/components/lab/LoveNameMaker";
import { LoveSync } from "@/components/lab/LoveSync";
import { MessageGenerator } from "@/components/lab/MessageGenerator";
import { MemoryBubble } from "@/components/lab/MemoryBubble";
import { LabAudioPlayer } from "@/components/lab/LabAudioPlayer";
import TextAnimation from "@/components/ui/staggerText";
import { AgentBentoGrid } from "@/components/ui/agent-bento-grid";
import { ImageScatter } from "@/components/ui/image-scatter";

export default function LabPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const words = "Made With Love".split(" ");

  return (
    <>
      {/* Hero Section for Love Lab */}
      <section ref={ref} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden mb-16 pt-20">
        <motion.div style={{ y: yParallax, willChange: "transform" }} className="absolute inset-0 -z-10 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          >
            <source src="/rain.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* Gentle fade at the bottom so it blends with the dark background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

        <motion.header style={{ y: yText, opacity: opacityText }} className="text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-white font-light mb-6 tracking-wide drop-shadow-lg flex flex-wrap justify-center gap-4">
            <TextAnimation divideBy="word" delay={0.2}>Made With Love</TextAnimation>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white/80 tracking-widest text-sm max-w-md mx-auto uppercase drop-shadow-md"
          >
            A little interactive playground for our universe
          </motion.p>
        </motion.header>
      </section>

      <div className="min-h-screen pb-48 px-4 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-32">

        {/* Interactive Components Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 md:gap-16"
          >
            <LoveNameMaker />
            <LoveSync />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 md:gap-16 h-full"
          >
            <MessageGenerator />
            <LabAudioPlayer />
          </motion.div>
        </div>

        {/* The Giant Memory Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-white/10"
        >
          <MemoryBubble />
        </motion.div>

        {/* The Bento Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-white/10"
        >
          <AgentBentoGrid />
        </motion.div>

        {/* Image Scatter */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-white/10 min-h-screen flex items-center justify-center relative"
        >
          <div className="absolute inset-0 z-0">
            <ImageScatter 
              data={[
                {
                  heading: "Our Smiles",
                  images: ["/1760869483602.jpg", "/20260208_073639.jpg", "/20260503_202503.jpg"]
                },
                {
                  heading: "Our Journey",
                  images: ["/IMG_20260602_130344.jpg", "/IMG_20260616_000622_684.webp", "/IMG_20260629_225155.jpg"]
                },
                {
                  heading: "Forever Us",
                  images: ["/IMG_20260630_120523.jpg", "/juzer-and-durriya.png", "/boy.png", "/girl.png"]
                }
              ]} 
              className="w-full h-full"
            />
          </div>
        </motion.div>
        </div>
      </div>
    </>
  );
}
