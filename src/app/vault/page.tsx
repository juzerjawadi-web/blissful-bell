"use client";

import { useState } from "react";
import { TravelVaultHero } from "@/components/vault/TravelVaultHero";
import { VaultCategories } from "@/components/vault/VaultCategories";
import { EditorialMasonry } from "@/components/vault/EditorialMasonry";
import { DestinationSpotlight } from "@/components/vault/DestinationSpotlight";
import { TravellerStories } from "@/components/vault/TravellerStories";
import { VaultStats } from "@/components/vault/VaultStats";
import { VaultFooterCTA } from "@/components/vault/VaultFooterCTA";
import { motion, AnimatePresence } from "framer-motion";

export default function VaultPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Add a slight delay to allow the state update to render the components before scrolling
    setTimeout(() => {
      document.getElementById("archive-start")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-black min-h-screen selection:bg-white/30">
      <TravelVaultHero onOpen={handleOpen} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            id="archive-start"
          >
            <VaultCategories />
            <EditorialMasonry />
            <DestinationSpotlight />
            <TravellerStories />
            <VaultStats />
            <VaultFooterCTA />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
