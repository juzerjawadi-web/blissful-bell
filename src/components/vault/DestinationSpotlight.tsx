"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const DESTINATIONS = [
  {
    id: "dubai",
    title: "DUBAI",
    subtitle: "Where every skyline feels like tomorrow.",
    image: "/boy.png"
  },
  {
    id: "bali",
    title: "BALI",
    subtitle: "Slow mornings. Wild landscapes. Unforgettable nights.",
    image: "/IMG_20260616_000622_684.webp"
  },
  {
    id: "uzbekistan",
    title: "UZBEKISTAN",
    subtitle: "Ancient cities, blue domes, modern adventures.",
    image: "/20260208_073639.jpg"
  },
  {
    id: "maldives",
    title: "MALDIVES",
    subtitle: "Somewhere between the ocean and a dream.",
    image: "/juzer-and-durriya.png"
  }
];

export function DestinationSpotlight() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Decorative intro text */}
        <div className="absolute top-12 left-4 md:left-12 z-20 mix-blend-difference">
          <h2 className="text-xs tracking-[0.3em] text-white/50 uppercase">
            Destination Spotlight
          </h2>
        </div>

        <motion.div style={{ x }} className="flex h-screen w-[400vw]">
          {DESTINATIONS.map((dest) => (
            <div key={dest.id} className="relative h-screen w-[100vw] flex flex-col items-center justify-center p-4">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover opacity-40 md:opacity-60 saturate-50"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20 md:mt-0">
                <motion.h3 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-200px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white font-light tracking-widest mb-6 md:mb-12 opacity-90 drop-shadow-2xl"
                >
                  {dest.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-200px" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-sm md:text-xl text-white/80 tracking-widest uppercase font-light max-w-xl mx-auto drop-shadow-lg"
                >
                  {dest.subtitle}
                </motion.p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
