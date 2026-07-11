"use client";
import { motion } from "framer-motion";

interface ArchetypeCardProps {
  id: string;
  title: string;
  tagline: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function ArchetypeCard({
  id,
  title,
  tagline,
  description,
  isSelected,
  onSelect,
}: ArchetypeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      // Refined to match the "embedded" look of the main container
      className={`group relative w-full text-left cursor-pointer rounded-2xl bg-[#0d1626]/40 border-2 transition-all duration-300 overflow-hidden p-5
        ${isSelected ? "border-[#c5a059]/60" : "border-white/5 hover:border-white/10"}`}
    >
      {/* Animated Glowing Accent Border */}
      {isSelected && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 border-2 border-[#c5a059]/40 rounded-2xl pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      
      {/* Background radial gradient reveal */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-[#c5a059]/[0.05] to-transparent transition-opacity duration-300 pointer-events-none
          ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`} 
      />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black tracking-wider uppercase transition-colors duration-200
              ${isSelected ? "text-[#c5a059]" : "text-white group-hover:text-white/90"}`}
            >
              {title}
            </h3>
            {isSelected && (
              <span className="text-[9px] font-black tracking-widest text-[#c5a059] uppercase bg-[#c5a059]/10 px-2 py-0.5 rounded-full border border-[#c5a059]/20">
                Selected
              </span>
            )}
          </div>
          <p className="text-[9px] text-white/30 tracking-widest uppercase font-bold mt-1">
            {tagline}
          </p>
        </div>

        <p className="text-xs text-white/50 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}