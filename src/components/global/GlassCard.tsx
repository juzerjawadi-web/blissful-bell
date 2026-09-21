"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { LiquidMetal } from "@/components/ui/liquid-metal";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  variant?: "card" | "bubble";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "card",
  interactive = false,
  ...props
}: GlassCardProps) {
  const isBubble = variant === "bubble";
  
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden group shadow-2xl",
        isBubble ? "rounded-full" : "rounded-3xl",
        className
      )}
      style={{ padding: "2px" }} // Border width
      whileHover={
        interactive
          ? {
              y: -8,
              scale: 1.02,
              filter: "brightness(1.1)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-full h-full relative">
          <LiquidMetal
            colorBack="#1a1a1a"
            colorTint="#ffffff"
            speed={0.4}
            repetition={4}
            distortion={0.2}
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* Inner Card Body */}
      <div 
        className={cn(
          "relative z-10 w-full h-full bg-black/60 backdrop-blur-2xl flex flex-col",
          isBubble ? "rounded-full" : "rounded-[calc(1.5rem-2px)]"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
