"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering over something interactive
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      setIsPointer(isClickable);
      
      // Check if it's a glass card to expand cursor
      const isCard = target.closest(".glass-card") || target.closest(".glass-bubble");
      setIsHovering(!!isCard);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  // Don't render until mounted to prevent hydration errors, and hide on mobile
  if (!isMounted || (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches)) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white/40 rounded-full pointer-events-none z-[100] backdrop-blur-sm mix-blend-screen"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 1.5 : isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 28,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[99]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.2 : isHovering ? 1.5 : 1,
          opacity: isHovering || isPointer ? 0.5 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5,
        }}
      />
    </>
  );
}
