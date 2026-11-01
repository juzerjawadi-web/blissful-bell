"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hardware-accelerated motion values bypass React component re-renders completely
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { stiffness: 750, damping: 28, mass: 0.1 });
  const dotY = useSpring(cursorY, { stiffness: 750, damping: 28, mass: 0.1 });
  const dotXOffset = useTransform(dotX, (val) => val - 8);
  const dotYOffset = useTransform(dotY, (val) => val - 8);

  const ringX = useSpring(cursorX, { stiffness: 250, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 20, mass: 0.5 });
  const ringXOffset = useTransform(ringX, (val) => val - 16);
  const ringYOffset = useTransform(ringY, (val) => val - 16);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Efficient selector match instead of expensive getComputedStyle forced reflow
      const isClickable = Boolean(
        target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer, [data-interactive='true']")
      );
      const isCard = Boolean(target.closest(".glass-card, .glass-bubble"));

      setIsPointer((prev) => (prev !== isClickable ? isClickable : prev));
      setIsHovering((prev) => (prev !== isCard ? isCard : prev));
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseover", updateHoverState, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [cursorX, cursorY]);

  // Don't render until mounted to prevent hydration errors, and hide on mobile
  if (!isMounted || (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches)) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white/40 rounded-full pointer-events-none z-[100] backdrop-blur-sm mix-blend-screen will-change-transform"
        style={{
          x: dotXOffset,
          y: dotYOffset,
        }}
        animate={{
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
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[99] will-change-transform"
        style={{
          x: ringXOffset,
          y: ringYOffset,
        }}
        animate={{
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
