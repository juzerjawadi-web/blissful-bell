"use client";

import { useEffect, useRef, useState } from "react";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch((err) => console.log("Autoplay blocked:", err));
      }
    };

    // Try to autoplay immediately
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked, wait for any click/interaction
        window.addEventListener("click", handleFirstInteraction, { once: true });
        window.addEventListener("touchstart", handleFirstInteraction, { once: true });
        window.addEventListener("scroll", handleFirstInteraction, { once: true });
      });
    }

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
      <audio ref={audioRef} src="/0820-01_1787195948749.mp3" loop />
    </>
  );
}
