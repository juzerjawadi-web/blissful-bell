"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { GlassCard } from "../global/GlassCard";

import { LiquidMetalButton } from "@/components/ui/liquid-metal";

export type SavedItem = {
  id: string;
  type: "book" | "song" | "poem" | "letter";
  title: string;
  subtitle: string;
};

interface VaultContextType {
  savedItems: SavedItem[];
  saveItem: (item: SavedItem) => void;
  removeItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const saveItem = (item: SavedItem) => {
    setSavedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  return (
    <VaultContext.Provider value={{ savedItems, saveItem, removeItem, isSaved, isDrawerOpen, setDrawerOpen }}>
      {children}
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <LiquidMetalButton 
          onClick={() => setDrawerOpen(true)}
          icon={<Heart className={`w-5 h-5 ${savedItems.length > 0 ? "fill-white/80 text-white/80" : "text-white/50"}`} />}
          size="md"
        >
          <span className="text-[10px] tracking-widest text-neutral-900 dark:text-white uppercase font-medium">
            My Archive ({savedItems.length})
          </span>
        </LiquidMetalButton>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm glass-panel border-l border-white/10 z-[70] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="font-serif text-2xl text-white font-light">My Little Archive</h3>
                  <p className="text-white/40 text-[10px] tracking-widest uppercase mt-2">The things I wanted to keep</p>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
                {savedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                    <Heart className="w-8 h-8 mb-4 stroke-1" />
                    <p className="text-sm">Your archive is empty.</p>
                  </div>
                ) : (
                  savedItems.map((item) => (
                    <GlassCard key={item.id} className="p-4 flex items-start justify-between group">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">{item.type}</p>
                        <h4 className="font-serif text-white/90">{item.title}</h4>
                        <p className="text-xs text-white/50 mt-1">{item.subtitle}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"
                      >
                        <X className="w-3 h-3 text-white/60" />
                      </button>
                    </GlassCard>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error("useVault must be used within a VaultProvider");
  }
  return context;
}
