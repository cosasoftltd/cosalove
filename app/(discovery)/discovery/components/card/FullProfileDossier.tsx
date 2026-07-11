"use client";
import { motion } from "framer-motion";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileHeader } from "./ProfileHeader";
import { TraitList } from "./TraitList";
import { DossierPhilosophy } from "./profile/DossierPhilosophy";
import { DossierVitals } from "./profile/DossierVitals";
import { DossierPrompt } from "./profile/DossierPrompt";

// Add the Profile interface (or import it from your types file)
interface Profile {
  id: string;
  username: string;
  age: number;
  archetype: string;
  avatarUrl: string;
  traits: string[];
  bio: string; // The backend 'bio' maps to your philosophy/intro
  valueSystem?: string; // Add these if your backend supports them
  lifestyle?: string;
}

export function FullProfileDossier({ 
  profile, 
  onClose, 
  onConfirmedConnect 
}: { 
  profile: Profile; 
  onClose: () => void;
  onConfirmedConnect: () => void;
}) {
  return (
    <motion.div 
      layoutId="profile-card"
      className="fixed inset-0 bg-[#0b121c] z-50 overflow-y-auto p-6 md:p-12 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-2xl bg-[#10141b] rounded-[32px] p-8 md:p-12 border border-[#2a2e35] relative h-fit shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 border border-[#c5a059]/10 rounded-[32px] pointer-events-none" />
        
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-bold">Verified Dossier</span>
          <button onClick={onClose} className="text-xs uppercase tracking-widest text-white/40 hover:text-white/90 transition-colors">
            ← Back to Feed
          </button>
        </div>

        <div className="space-y-8">
          <ProfileAvatar src={profile.avatarUrl} />
          
          <ProfileHeader 
            name={profile.username} 
            age={profile.age} 
            archetype={profile.archetype} 
          />

          <TraitList traits={profile.traits} />

          {/* Mapping real backend fields */}
          <DossierPhilosophy text={profile.bio || "No philosophy shared."} />

          <DossierVitals 
            valueSystem={profile.valueSystem || "Not specified"} 
            lifestyle={profile.lifestyle || "Not specified"} 
          />

          {/* Assuming you want to keep the prompt block */}
          <DossierPrompt 
            label="Personal Alignment" 
            quote="The most luxury asset you can share with someone is undivided focus." 
          />

          <div className="bg-[#161c26] rounded-2xl p-6 border border-white/5 text-center mt-12">
            <p className="text-xs text-[#c5a059] uppercase tracking-widest font-bold">Ready to Connect?</p>
            <button 
              onClick={onConfirmedConnect}
              className="mt-4 px-6 py-2 bg-[#c5a059] text-[#10141b] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors"
            >
              Initialize Connection
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}