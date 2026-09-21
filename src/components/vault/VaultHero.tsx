"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function VaultHero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const words = "Words that found their way to the heart.".split(" ");

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 px-4">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Modifying_hair_and_eyes_animation_202608111636.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText, willChange: "transform, opacity" }}
        className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[10px] md:text-xs tracking-[0.3em] text-white/50 uppercase mb-8"
        >
          The Love Vault
        </motion.span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-light tracking-wide mb-8 leading-tight flex flex-wrap justify-center gap-[0.3em]">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            {words.map((word, index) => (
              <motion.span 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 50, damping: 20 } }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <p className="text-sm md:text-base text-white/60 tracking-wider max-w-lg mx-auto leading-relaxed mb-16">
          A collection of love stories, poems, letters, songs, and little pieces of forever.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          <span className="text-[10px] tracking-widest text-white/40 uppercase">
            Enter the archive · Take your time
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
