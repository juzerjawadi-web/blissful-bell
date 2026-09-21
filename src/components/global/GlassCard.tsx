"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  
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
          {/* Mobile Fallback (CSS Gradient instead of heavy WebGL) */}
          {!isDesktop && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5" />
          )}
          
          {/* Desktop WebGL Shader */}
          {isDesktop && (
            <div className="w-full h-full">
              <LiquidMetal
                colorBack="#1a1a1a"
                colorTint="#ffffff"
                speed={0.2} // Reduced speed for better perf
                repetition={4}
                distortion={0.2}
                className="w-full h-full"
              />
            </div>
          )}
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
