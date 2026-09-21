"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { BOOKS, VaultMood, VaultEra } from "@/data/vault";
import { useVault } from "./VaultContext";
import { Heart, Search, BookOpen, Play } from "lucide-react";

export function LoveLibrary() {
  const [search, setSearch] = useState("");
  const [activeMood, setActiveMood] = useState<VaultMood | "All">("All");
  const [activeEra, setActiveEra] = useState<VaultEra | "All">("All");
  const [playingBookUrl, setPlayingBookUrl] = useState<string | null>(null);
  const { saveItem, isSaved, removeItem } = useVault();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const filteredBooks = BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesMood = activeMood === "All" || book.moods.includes(activeMood);
    const matchesEra = activeEra === "All" || book.era === activeEra;
    return matchesSearch && matchesMood && matchesEra;
  });

  const moods: VaultMood[] = ["Tender", "Passionate", "Melancholic", "Hopeful", "Devastating", "Comforting"];
  const eras: VaultEra[] = ["Classic", "Vintage", "Modern", "Contemporary"];

  return (
    <section ref={ref} className="w-full min-h-screen py-24 relative z-10 flex flex-col justify-center overflow-hidden" id="library">
      {/* Background Image with Parallax */}
      <motion.div style={{ y, willChange: "transform" }} className="absolute -inset-y-[20%] inset-x-0 z-0">
        <Image 
          src="/boy.png" 
          fill 
          alt="Boy" 
          className="object-cover" 
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-16 drop-shadow-2xl">
          <h2 className="text-sm tracking-[0.2em] text-white uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">01 — The Library</h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Love Books</h3>
          <p className="text-white tracking-wider text-sm max-w-md mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Stories about the kind of love that stays.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search the love archive..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <select 
              value={activeMood} 
              onChange={(e) => setActiveMood(e.target.value as VaultMood | "All")}
              className="bg-black border border-white/10 text-white/70 text-xs py-2 px-4 rounded-full outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              <option value="All">All Moods</option>
              {moods.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            <select 
              value={activeEra} 
              onChange={(e) => setActiveEra(e.target.value as VaultEra | "All")}
              className="bg-black border border-white/10 text-white/70 text-xs py-2 px-4 rounded-full outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              <option value="All">All Eras</option>
              {eras.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

      {/* Book Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredBooks.map((book) => {
            const saved = isSaved(book.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={book.id}
              >
                <GlassCard className="h-full p-8 flex flex-col group hover:bg-white/[0.04] transition-colors duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-medium">
                      LOVE • {book.era}
                    </span>
                    <button
                      onClick={() => saved ? removeItem(book.id) : saveItem({ id: book.id, type: "book", title: book.title, subtitle: book.author })}
                      className="text-white/30 hover:text-white/80 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${saved ? "fill-white/80 text-white/80" : ""}`} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-2xl text-white/90 mb-1">{book.title}</h4>
                    <p className="text-xs text-white/50 tracking-wider mb-6">{book.author}</p>
                    
                    <p className="text-sm text-white/70 leading-relaxed font-light italic mb-8">
                      “{book.description}”
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <button className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/60 hover:text-white transition-colors">
                      <span>Read Details</span>
                      <BookOpen className="w-3 h-3" />
                    </button>
                    {book.embedUrl && (
                      <button 
                        onClick={() => setPlayingBookUrl(book.embedUrl!)}
                        className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-pastel-pink/80 hover:text-pastel-pink transition-colors ml-4"
                      >
                        <span>Listen to Audiobook</span>
                        <Play className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-[10px] text-white/30 tracking-widest">
                      ♡ {book.hearts >= 1000 ? (book.hearts/1000).toFixed(1) + 'k' : book.hearts} hearts
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredBooks.length === 0 && (
        <div className="w-full py-24 text-center text-white/30 text-sm tracking-widest uppercase">
          No books found in this section of the archive.
        </div>
      )}

      <AnimatePresence>
        {playingBookUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setPlayingBookUrl(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setPlayingBookUrl(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                ✕
              </button>
              <iframe
                width="100%"
                height="100%"
                src={playingBookUrl}
                title="YouTube audiobook player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
