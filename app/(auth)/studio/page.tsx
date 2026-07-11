"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCalibrationStore } from "@/src/store/useOnboardingStore";

import api from "@/src/api/axios";
import PreferenceSelector from "./components/PreferenceSelector";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

interface DiscoveryFormData {
  email: string;
  phone: string;
  identity: string;
  seeking: string;
  maxDistance: string;
}

export default function DiscoveryCalibrationPage() {
  const [isExiting, setIsExiting] = useState(false);
  const { updateDossier, dossier } = useCalibrationStore();
  const router = useRouter();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DiscoveryFormData>({
    defaultValues: { email: "", phone: "", identity: "", seeking: "", maxDistance: "25" }
  });

  const currentIdentity = watch("identity");
  const currentDistance = watch("maxDistance");

  const handleIdentityChange = (val: string) => {
    setValue("identity", val, { shouldValidate: true });
    setValue("seeking", val === "male" ? "female" : "male");
  };

  const onSubmit = async (data: DiscoveryFormData) => {
    updateDossier(data);
    setIsExiting(true);

    try {
      const formData = new FormData();
      
      // Basic info from global store
      formData.append('name', dossier.name || "User");
      formData.append('birthdate', dossier.birthdate || "");
      formData.append('traits', JSON.stringify(dossier.selectedVibes || []));
      formData.append('archetype', dossier.archetype || "");
      formData.append('bio', dossier.bio || "");
      
      // Fields requested by your Serializer
      // If these aren't in your store yet, we send empty strings to satisfy the DB schema
      formData.append('philosophy', dossier.philosophy || "");
      formData.append('value_system', dossier.valueSystem || "");
      formData.append('lifestyle', dossier.lifestyle || "");

      // Form data
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('max_distance', data.maxDistance);
      
      if (dossier.avatarFile) {
        formData.append('avatar_url', dossier.avatarFile);
      }

      await api.post('/dossiers/calibrate/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTimeout(() => { router.push("/discovery"); }, 600);
    } catch (error: any) {
      console.error("Final calibration failed:", error.response?.data || error.message);
      setIsExiting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-white font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
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
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#0d1626]/60 backdrop-blur-xl border-2 border-[#c5a059]/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(197,160,89,0.05)] space-y-6"
          >
            <div className="space-y-2 text-center">
              <span className="text-[9px] font-black text-[#c5a059] uppercase block tracking-[0.4em]">Stage 03 / 03</span>
              <h2 className="text-xl font-medium tracking-wide">Network Calibration</h2>
              <p className="text-xs text-white/40">Secure your anchors and specify match discovery metrics.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-3.5">
                <input
                  type="email"
                  placeholder="Secure Email"
                  {...register("email", { required: true })}
                  className={`w-full h-11 bg-[#0d1626]/40 border rounded-xl px-4 text-sm font-light focus:outline-none transition-colors ${errors.email ? "border-red-500/40" : "border-white/10 focus:border-[#c5a059]/50"}`}
                />
                <input
                  type="tel"
                  placeholder="Phone Reference"
                  {...register("phone", { required: true })}
                  className={`w-full h-11 bg-[#0d1626]/40 border rounded-xl px-4 text-sm font-light focus:outline-none transition-colors ${errors.phone ? "border-red-500/40" : "border-white/10 focus:border-[#c5a059]/50"}`}
                />
              </div>

              <PreferenceSelector 
                label="Your Identity"
                options={[{ id: "male", name: "I am a Man" }, { id: "female", name: "I am a Woman" }]}
                selectedValue={currentIdentity}
                onChange={handleIdentityChange}
              />
              <input type="hidden" {...register("identity", { required: true })} />

              <div className="text-center py-2 text-[10px] uppercase tracking-widest font-bold text-[#c5a059] bg-[#c5a059]/5 rounded-xl border border-[#c5a059]/10">
                {currentIdentity ? `🎯 Discovery Matrix: Calibrated for ${currentIdentity === "male" ? "Women" : "Men"}` : "Select identity to unlock"}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/50">
                  <span>Proximity Scope</span>
                  <span className="text-[#c5a059]">{currentDistance} Miles</span>
                </div>
                <input type="range" min="5" max="100" {...register("maxDistance")} className="w-full h-1 bg-[#0d1626] rounded-lg appearance-none cursor-pointer accent-[#c5a059]" />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all"
              >
                Initialize Matrix ⚡
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}