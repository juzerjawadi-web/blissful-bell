"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextShimmerWave = ({
  children,
  className,
  duration = 1,
}: {
  children: string;
  className?: string;
  duration?: number;
}) => {
  const characters = children.split("");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.3, y: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          className={cn("inline-block", char === " " && "w-[0.3em]")}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};
