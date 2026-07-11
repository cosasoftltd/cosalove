"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCalibrationStore } from "@/src/store/useOnboardingStore";
import OnboardingUpload from "./components/OnboardingUpload";
import VibeMatrix, { VibeOption } from "./components/VibeMatrix";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

const VIBE_OPTIONS: VibeOption[] = [
  { id: "deep", label: "Deep Dynamics", emoji: "✨" },
  { id: "slow", label: "Slow Burn", emoji: "⏳" },
  { id: "spontaneous", label: "Spontaneous Intellect", emoji: "⚡" },
  { id: "creative", label: "Creative Chaos", emoji: "🎨" },
];

export default function OnboardingPage() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { name: "", birthdate: "", avatarFile: null as File | null, selectedVibes: [] as string[] }
  });
  
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const selectedVibes = watch("selectedVibes");
  
  // Connect to global store[cite: 1, 2]
  const { updateDossier } = useCalibrationStore();

  const onSubmit = (data: any) => {
    // Save Stage 1 data to store instead of sending to API[cite: 1, 2]
    updateDossier({ 
      name: data.name, 
      birthdate: data.birthdate, 
      avatarFile: data.avatarFile, 
      selectedVibes: data.selectedVibes 
    });
    
    setIsExiting(true);
    // Navigate to Page 2[cite: 1, 2]
    setTimeout(() => router.push('/vault'), 500);
  };

  return (
    <div className="relative w-full min-h-screen text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <BackgroundCanvas />

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            className="relative z-10 w-full max-w-md bg-[#0d1626]/60 backdrop-blur-xl border-2 border-[#c5a059]/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(197,160,89,0.1)] space-y-6"
          >
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium tracking-wide">Identity Studio</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <OnboardingUpload onUploadComplete={(file) => setValue("avatarFile", file)} />

              <div className="space-y-4">
                <input
                  {...register("name", { required: true })}
                  placeholder="Display Name"
                  className="w-full h-11 bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 text-sm focus:border-[#c5a059] outline-none"
                />
                <input
                  {...register("birthdate", { required: true })}
                  type="date"
                  className="w-full h-11 bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 text-sm text-white/70 focus:border-[#c5a059] outline-none"
                />
              </div>

              <VibeMatrix
                options={VIBE_OPTIONS}
                selectedVibes={selectedVibes}
                onToggleVibe={(id) => {
                  const current = selectedVibes;
                  setValue("selectedVibes", current.includes(id) ? current.filter(v => v !== id) : [...current, id]);
                }}
              />

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all"
              >
                Continue to Vault ⚡
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}