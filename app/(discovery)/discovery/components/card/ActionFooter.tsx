"use client";
import { motion } from "framer-motion";

interface ActionFooterProps {
  onPass: () => void;
  onConnect: () => void;
}

export function ActionFooter({ onPass, onConnect }: ActionFooterProps) {
  return (
    <div className="mt-2 flex gap-4 w-full">
      <motion.button 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.stopPropagation(); // Avoid triggering any container click card wrappers
          onPass();
        }}
        className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest bg-[#1a2028] hover:bg-[#222933] hover:text-white/80 transition-colors"
      >
        Pass
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.stopPropagation();
          onConnect();
        }}
        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#8e6e30] text-[#10141b] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
      >
        Connect
      </motion.button>
    </div>
  );
}