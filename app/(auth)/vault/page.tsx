"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCalibrationStore } from "@/src/store/useOnboardingStore";
import ArchetypeCard from "./components/Archetype";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

const ARCHETYPES = [
  {
    id: "architect",
    title: "Architect",
    tagline: "Systems & Structure",
    description: "You seek structural harmony and deep ideological alignments. Logic, long-term roadmaps, and execution drive your dynamic connection matrix.",
  },
  {
    id: "strategist",
    title: "Strategist",
    tagline: "Intent & Execution",
    description: "Calculated, intensely authentic, and driven. You bypass casual superficialities completely, searching for calculated intellectual synchronization.",
  },
  {
    id: "visionary",
    title: "Visionary",
    tagline: "Abstraction & Horizon",
    description: "A catalyst for creative expansion. Your match dynamic is driven by limitless abstraction, boundary-pushing theories, and abstract perspectives.",
  },
];

export default function ArchetypeVaultPage() {
  const [selectedArchetype, setSelectedArchetype] = useState<string>("");
  const [isExiting, setIsExiting] = useState(false);
  
  // Hook into the store[cite: 1, 2]
  const { updateDossier } = useCalibrationStore();
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArchetype) return;

    // Save selection to global store before moving to the next page[cite: 1, 2]
    updateDossier({ archetype: selectedArchetype });

    setIsExiting(true);
    setTimeout(() => {
      router.push("/studio"); // Navigate to final page[cite: 1, 2]
    }, 500);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070a0f] text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <BackgroundCanvas />

      <div className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none select-none">
        <h1 className="text-sm font-black tracking-[0.5em] text-[#c5a059] uppercase opacity-90 drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">
          Cosalove
        </h1>
      </div>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl bg-[#0d1626]/60 backdrop-blur-xl border-2 border-[#c5a059]/40 rounded-2xl p-10 shadow-[0_0_50px_rgba(197,160,89,0.05)] space-y-8"
          >
            <div className="space-y-2 text-center max-w-md mx-auto">
              <motion.span
                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                animate={{ letterSpacing: "0.4em", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[9px] font-black text-[#c5a059] uppercase block"
              >
                Stage 02 / 03
              </motion.span>
              <h2 className="text-xl font-medium tracking-wide">The Archetype Vault</h2>
              <p className="text-xs text-white/40">
                Unlock your operational frequency. This acts as the geometric core for your matrix connections.
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ARCHETYPES.map((arch) => (
                  <ArchetypeCard
                    key={arch.id}
                    {...arch}
                    isSelected={selectedArchetype === arch.id}
                    onSelect={setSelectedArchetype}
                  />
                ))}
              </div>

              <div className="max-w-md mx-auto">
                <motion.button
                  whileHover={selectedArchetype ? { scale: 1.01 } : {}}
                  whileTap={selectedArchetype ? { scale: 0.99 } : {}}
                  type="submit"
                  disabled={!selectedArchetype}
                  className={`w-full h-12 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 
                    ${selectedArchetype 
                      ? "bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] cursor-pointer" 
                      : "bg-[#0d1626]/40 text-white/10 border border-white/5 cursor-not-allowed"
                    }`}
                >
                  Calibrate Discovery ⚡
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}