"use client";
import { useState, useEffect } from "react";

interface OnboardingUploadProps {
  // CRITICAL FIX: Expect a File object here, not a string
  onUploadComplete: (file: File) => void; 
}

export default function OnboardingUpload({ onUploadComplete }: OnboardingUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // BEST PRACTICE: Prevent memory leaks when the user navigates away
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Create the visual preview string for the UI
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      
      // 2. Pass the actual File binary back up to the form for Axios
      onUploadComplete(file); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="relative group cursor-pointer w-28 h-28 rounded-full border border-dashed border-white/10 hover:border-[#c5a059]/40 flex flex-col items-center justify-center overflow-hidden bg-white/[0.01] transition-all duration-300">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        
        {preview ? (
          <img src={preview} alt="Preview Avatar" className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="text-center space-y-1 p-2">
            <span className="block text-lg text-white/30 group-hover:text-[#c5a059]/60 transition-colors">+</span>
            <span className="block text-[8px] font-bold tracking-wider uppercase text-white/30 group-hover:text-white/50 transition-colors">Upload Portrait</span>
          </div>
        )}

        {preview && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/90">Change</span>
          </div>
        )}
      </label>
    </div>
  );
}