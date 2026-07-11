"use client";
import { motion } from "framer-motion";
import { CompassSVG } from "./CompassSVG";

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0d3873] overflow-hidden min-h-screen">
      {/* Deep Radial Glow
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e3a5f_20%,#0b121c_80%)]" /> */}
      
      {/* Rotating Compass Layers */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[1200px] h-[1200px]"
      >
        <CompassSVG />
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[1200px] h-[1200px]"
      >
        <CompassSVG />
      </motion.div>
    </div>
  );
}