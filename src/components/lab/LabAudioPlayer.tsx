"use client";

import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { motion } from "framer-motion";

export function LabAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt to autoplay when component mounts
  useEffect(() => {
    if (audioRef.current) {
      // Browsers require interaction before playing audio, but if they navigated here 
      // from another page via Next.js router, it counts as interaction and usually allows it!
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked by browser. User must click play.", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      onClick={togglePlay}
      className="flex-1 min-h-[200px] glass-bubble border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
    >
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute inset-0 bg-gradient-to-tr from-pastel-pink/10 via-transparent to-pastel-lavender/10 pointer-events-none"
        />
      )}
      
      <audio ref={audioRef} src="/sajni_re.mp3" loop />
      
      <div className="flex flex-col items-center gap-3 z-10">
        <div className="flex items-center gap-2 text-white/80">
          <Music size={16} className={isPlaying ? "animate-pulse text-pastel-pink" : ""} />
          <span className="text-sm tracking-widest uppercase font-medium">
            {isPlaying ? "Now Playing: Sajni Re" : "Click to Play Our Song"}
          </span>
        </div>
      </div>
    </div>
  );
}
