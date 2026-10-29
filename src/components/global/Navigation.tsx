"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, FlaskConical, Library } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Universe", path: "/", icon: <Home size={18} /> },
    { name: "Love Lab", path: "/lab", icon: <FlaskConical size={18} /> },
    { name: "Vault", path: "/vault", icon: <Library size={18} /> },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:bottom-auto md:top-8 md:w-full md:px-12 flex justify-center md:justify-between items-center pointer-events-none">
      
      {/* Desktop Logo (Hidden on mobile) */}
      <div className="hidden md:block pointer-events-auto">
        <Link href="/" className="text-pastel-white/80 hover:text-white transition-colors duration-500 font-serif text-lg tracking-widest uppercase">
          Durriya I Love U
        </Link>
      </div>

      {/* Navigation Pill */}
      <nav className="pointer-events-auto glass-bubble px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500"
            >
              {isActive ? (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : null}
              <span className={cn(
                "relative z-10 flex items-center gap-2",
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              )}>
                <span className="md:hidden">{item.icon}</span>
                <span className="hidden md:inline">{item.name}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Right Side Placeholder */}
      <div className="hidden md:block w-8" />
    </div>
  );
}
