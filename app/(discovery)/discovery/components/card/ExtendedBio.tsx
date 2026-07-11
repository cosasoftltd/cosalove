"use client";

// Define the interface for the incoming dossier data
interface ExtendedBioProps {
  dossier: {
    bio: string;
    archetype: string;
  };
}

export function ExtendedBio({ dossier }: ExtendedBioProps) {
  // Destructure with fallback to ensure the UI doesn't crash if data is missing
  const { bio, archetype } = dossier || {};

  return (
    <div className="pt-6 px-2 text-center space-y-4">
      {/* Meta-data row with dynamic alignment */}
      <div className="flex justify-center gap-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">
        <span>📍 5 Miles Away</span>
        <span>•</span>
        <span className="text-[#c5a059]">
          {archetype ? `${archetype} Alignment` : "Uncalibrated"}
        </span>
      </div>
      
      {/* Dynamic bio text */}
      <p className="text-sm text-white/70 leading-relaxed font-light">
        {bio || "This user is currently in stealth mode and has not shared a bio."}
      </p>
    </div>
  );
}