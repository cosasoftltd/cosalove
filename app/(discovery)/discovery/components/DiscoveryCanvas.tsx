"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileAvatar } from "./card/ProfileAvatar";
import { ProfileHeader } from "./card/ProfileHeader";
import { TraitList } from "./card/TraitList";
import { ExtendedBio } from "./card/ExtendedBio";
import { ActionFooter } from "./card/ActionFooter";
import { FullProfileDossier } from "./card/FullProfileDossier";

// Updated Interface to match your backend exactly
interface ProfileData {
  id: string;
  username: string; // Matched to serializer
  age: number;
  archetype: string;
  avatarUrl: string;
  traits: any; 
  bio: string; // Added to match your serializer
}

export function DiscoveryCanvas({ users }: { users: ProfileData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullDossier, setShowFullDossier] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | "up" | null>(null);

  const activeProfile = users ? users[currentIndex] : null;

  const handleAction = (type: "pass" | "connect") => {
    if (type === "pass") {
      setExitDirection("left");
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setExitDirection(null);
      }, 200);
    } else {
      setShowFullDossier(true);
    }
  };

  const handleNextInQueue = () => {
    setShowFullDossier(false);
    setExitDirection("right");
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
    }, 200);
  };

  if (!activeProfile) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-xl mx-auto p-12 text-center bg-[#10141b] rounded-[32px] border border-[#2a2e35] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center space-y-6"
    >
      <div className="w-16 h-16 rounded-full border border-[#c5a059]/30 flex items-center justify-center bg-[#161c26]">
        <div className="w-6 h-6 border-b-2 border-r-2 border-[#c5a059] rotate-45 mb-1" />
      </div>
      
      <h3 className="text-xl text-[#c5a059] font-bold uppercase tracking-widest mt-2">
        Dossier Pipeline Exhausted
      </h3>

      {/* Pulsing Refresh Button */}
      <motion.button
        onClick={() => window.location.reload()}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0 0 rgba(197, 160, 89, 0.4)",
            "0 0 0 10px rgba(197, 160, 89, 0)",
            "0 0 0 0 rgba(197, 160, 89, 0)"
          ]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="mt-4 px-8 py-3 rounded-full bg-[#c5a059] text-[#10141b] font-bold uppercase tracking-widest text-sm hover:bg-[#a3834a] transition-colors"
      >
        Refresh Pipeline
      </motion.button>
    </motion.div>
   );
  }

  const getExitX = () => {
    if (exitDirection === "left") return -300;
    if (exitDirection === "right") return 300;
    return 0;
  };

  return (
    <AnimatePresence mode="wait">
      {!showFullDossier ? (
        <motion.div 
          key={activeProfile.id}
          layoutId="profile-card"
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, x: getExitX(), scale: 0.95, transition: { duration: 0.25 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-md sm:w-full max-w-xl mx-auto p-[2px] rounded-3xl bg-gradient-to-br from-[#c5a059] via-[#4a3a1d] to-[#c5a059] flex flex-col -mt-40"
        >
          <div className="bg-[#10141b] rounded-[22px] p-6 md:p-8 border border-[#2a2e35] relative overflow-hidden flex flex-col w-full">
            <div className="absolute inset-0 border border-[#c5a059]/20 rounded-[22px] pointer-events-none" />
            <div className="mt-2 cursor-pointer" onClick={() => setShowFullDossier(true)}>
              <ProfileAvatar src={activeProfile.avatarUrl} />
            </div>
            
            <ProfileHeader 
              name={activeProfile.username} 
              age={activeProfile.age} 
              archetype={activeProfile.archetype} 
            />
            
            <div className="w-full mt-6 px-4">
              <TraitList traits={activeProfile.traits} />
            </div>
            
            <div className="w-full mt-4 px-2">
              <ExtendedBio dossier={{ bio: activeProfile.bio, archetype: activeProfile.archetype }} />
            </div>
            
            <div className="w-full mt-6 pt-4">
              <ActionFooter 
                onPass={() => handleAction("pass")} 
                onConnect={() => handleAction("connect")} 
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <FullProfileDossier 
          profile={activeProfile} 
          onClose={() => setShowFullDossier(false)} 
          onConfirmedConnect={handleNextInQueue} 
        />
      )}
    </AnimatePresence>
  );
}