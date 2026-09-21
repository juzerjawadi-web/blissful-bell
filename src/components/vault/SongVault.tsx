"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../global/GlassCard";
import { SONGS, LoveSong } from "@/data/vault";
import { useVault } from "./VaultContext";
import { Heart, Play, Music } from "lucide-react";

const FEELINGS = [
  "I MISS THEM",
  "I'M FALLING",
  "I'M IN LOVE",
  "WE'RE HAPPY",
  "I'M HEARTBROKEN",
  "I NEED COMFORT",
  "I WANT TO DANCE"
];

const getRandomSong = () => SONGS[Math.floor(Math.random() * SONGS.length)];

export function SongVault() {
  const { saveItem, isSaved, removeItem } = useVault();
  const [activeFeeling, setActiveFeeling] = useState<string | null>(null);
  const [recommendedSong, setRecommendedSong] = useState<LoveSong | null>(null);
  const [playingSongUrl, setPlayingSongUrl] = useState<string | null>(null);

  const handleFeelingClick = (feeling: string) => {
    setActiveFeeling(feeling);
    setRecommendedSong(getRandomSong());
  };

  return (
    <section className="w-full py-24 relative z-10" id="songs">
      
      {/* 03 — THE SONG VAULT */}
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4">02 — The Song Vault</h2>
        <h3 className="text-3xl md:text-5xl font-serif text-white font-light mb-4">Songs That Sound Like Love</h3>
        <p className="text-white/60 tracking-wider text-sm max-w-md mx-auto">
          Some songs are not heard. They&apos;re remembered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {SONGS.map((song) => {
          const saved = isSaved(song.id);
          return (
            <GlassCard key={song.id} className="p-6 flex items-center gap-6 group hover:bg-white/[0.04] transition-all">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
                <Music className="w-6 h-6 text-white/20" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] tracking-widest uppercase text-white/40 mb-2">{song.moodCategory}</p>
                <h4 className="font-serif text-xl text-white/90 mb-1">{song.title}</h4>
                <p className="text-xs text-white/50 mb-3">{song.artist}</p>
                <p className="text-xs text-white/40 italic font-light">&quot;{song.description}&quot;</p>
              </div>
              <div className="flex flex-col items-center gap-4 shrink-0">
                <button 
                  onClick={() => song.embedUrl && setPlayingSongUrl(song.embedUrl)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Play className="w-4 h-4 text-white ml-1" />
                </button>
                <button
                  onClick={() => saved ? removeItem(song.id) : saveItem({ id: song.id, type: "song", title: song.title, subtitle: song.artist })}
                  className="text-white/30 hover:text-white/80 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${saved ? "fill-white/80 text-white/80" : ""}`} />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* 04 — SONG FOR THIS MOMENT */}
      <GlassCard className="max-w-4xl mx-auto p-8 md:p-16 flex flex-col items-center text-center">
        <h3 className="font-serif text-2xl md:text-3xl text-white/90 mb-8">What are you feeling?</h3>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FEELINGS.map((feeling) => (
            <button
              key={feeling}
              onClick={() => handleFeelingClick(feeling)}
              className={`px-4 py-2 border rounded-full text-xs tracking-widest transition-all ${
                activeFeeling === feeling 
                  ? "border-pastel-lavender/50 bg-pastel-lavender/10 text-white" 
                  : "border-white/10 text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20"
              }`}
            >
              {feeling}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {recommendedSong ? (
            <motion.div
              key={recommendedSong.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-md"
            >
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6">Tonight&apos;s Song</div>
              <h4 className="font-serif text-4xl text-white mb-2">{recommendedSong.title}</h4>
              <p className="text-sm text-pastel-lavender/80 tracking-widest uppercase mb-6">{recommendedSong.artist}</p>
              <p className="text-sm text-white/60 italic font-light mb-8">
                &quot;{recommendedSong.description}&quot;
              </p>
              
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={() => recommendedSong.embedUrl && setPlayingSongUrl(recommendedSong.embedUrl)}
                  className="px-8 py-3 bg-white text-black rounded-full text-xs tracking-widest uppercase font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
                >
                  <Play className="w-3 h-3" />
                  Listen
                </button>
                <button 
                  onClick={() => {
                    if (!isSaved(recommendedSong.id)) {
                      saveItem({ id: recommendedSong.id, type: "song", title: recommendedSong.title, subtitle: recommendedSong.artist });
                    }
                  }}
                  className="px-6 py-3 border border-white/20 rounded-full text-xs tracking-widest uppercase text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Heart className={`w-3 h-3 ${isSaved(recommendedSong.id) ? "fill-white" : ""}`} />
                  Save to My Vault
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs tracking-widest text-white/20 uppercase h-[200px] flex items-center justify-center"
            >
              Select a mood to discover a song
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      <AnimatePresence>
        {playingSongUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setPlayingSongUrl(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setPlayingSongUrl(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                ✕
              </button>
              <iframe
                width="100%"
                height="100%"
                src={playingSongUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
