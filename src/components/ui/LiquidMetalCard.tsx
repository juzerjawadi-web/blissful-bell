"use client";

import React from "react";
import { LiquidMetal } from "./liquid-metal";
import { cn } from "@/lib/utils";

export function LiquidMetalCard({ 
  children, 
  className,
  borderWidth = 2,
  contentClassName
}: { 
  children: React.ReactNode; 
  className?: string;
  borderWidth?: number;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden shadow-2xl group",
        className
      )}
      style={{ padding: borderWidth }}
    >
      {/* Liquid Metal Background/Border Layer */}
      <LiquidMetal
        colorBack="#1a1a1a"
        colorTint="#ffffff"
        speed={0.3}
        repetition={3}
        distortion={0.2}
        scale={1.5}
        className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"
      />

      {/* Inner Card Body */}
      <div
        className={cn(
          "relative z-10 w-full h-full bg-black/80 backdrop-blur-2xl rounded-[calc(1.5rem-2px)] flex flex-col transition-colors duration-500",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
