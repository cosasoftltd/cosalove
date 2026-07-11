"use client";
import { motion } from "framer-motion";

interface TraitListProps {
  traits: string[] | null | undefined;
}

export function TraitList({ traits }: TraitListProps) {
  const safeTraits = traits || [];

  return (
    // Changed justify-between to justify-center and added gap-6
    <div className="flex flex-wrap justify-center gap-6 mt-8 px-4 border-b border-white/5 pb-8">
      {safeTraits.map((t, index) => (
        <motion.div 
          key={index} 
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full border border-[#c5a059]/40 bg-[#1a2028] flex items-center justify-center">
            <div className="w-6 h-6 border border-[#c5a059] rotate-45" />
          </div>
          <span className="text-[9px] text-white/60 mt-3 font-bold tracking-widest uppercase">
            {t}
          </span>
        </motion.div>
      ))}
    </div>
  );
}