"use client";

import { cn } from "@/lib/utils";

interface BackgroundLayerProps {
  className?: string;
}

export function BackgroundLayer({ className }: BackgroundLayerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-50 bg-black overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* 
        This is a placeholder for the future animated background.
        Currently it provides the pure black base and a subtle static particle overlay if needed.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-black pointer-events-none" />
    </div>
  );
}
