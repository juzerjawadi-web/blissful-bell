"use client";

import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Images mixed to have enough for 4 columns of 3 images (12 images total)
const ALL_IMAGES = [
  "/1760869483602.jpg",
  "/IMG_20260630_120523.jpg",
  "/IMG_20260602_130344.jpg",
  "/20260503_202503.jpg",
  "/IMG_20260629_225155.jpg",
  "/girl.png",
  "/boy.png",
  "/juzer-and-durriya.png",
  "/IMG_20260616_000622_684.webp",
  "/20260208_073639.jpg",
  "/1760869483602.jpg", // repeat to fill
  "/IMG_20260602_130344.jpg", // repeat to fill
];

export function EditorialMasonry() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { height } = dimension;
  const y = useTransform(smoothProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(smoothProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="w-full bg-black text-white relative z-10 overflow-hidden">
      {/* Title Section */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-sm tracking-[0.3em] text-white/50 uppercase mb-4">Curated Archives</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-light tracking-wide">Visual Journal</h3>
          </div>
          <p className="text-white/40 text-sm tracking-widest uppercase max-w-xs leading-relaxed">
            Moments frozen in time across the globe.
          </p>
        </motion.div>
      </div>

      {/* The Parallax Gallery */}
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw]"
      >
        <Column images={[ALL_IMAGES[0], ALL_IMAGES[1], ALL_IMAGES[2]]} y={y} />
        <Column images={[ALL_IMAGES[3], ALL_IMAGES[4], ALL_IMAGES[5]]} y={y2} />
        <Column images={[ALL_IMAGES[6], ALL_IMAGES[7], ALL_IMAGES[8]]} y={y3} />
        <Column images={[ALL_IMAGES[9], ALL_IMAGES[10], ALL_IMAGES[11]]} y={y4} />
      </div>
    </section>
  );
}

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl bg-white/5">
          <Image
            src={src}
            alt="Gallery image"
            fill
            className="pointer-events-none object-cover transition-transform duration-[2000ms] ease-out hover:scale-105 hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      ))}
    </motion.div>
  );
};
