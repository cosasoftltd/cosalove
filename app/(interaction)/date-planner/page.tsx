"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

interface DateSuggestion {
  id: string;
  category: "Intellectual" | "Experiential" | "Minimalist";
  title: string;
  description: string;
  coordinates: string;
}

const mockSuggestions: DateSuggestion[] = [
  {
    id: "s1",
    category: "Intellectual",
    title: "Independent Bookstore & Espresso Calibration",
    description: "Browse curated independent collections, pick an essay book for each other, and break down the concepts over pour-overs.",
    coordinates: "Midtown Core • 2:00 PM Saturday"
  },
  {
    id: "s2",
    category: "Experiential",
    title: "Architectural Walk & Botanical Conservatory",
    description: "A low-stimulation environment walking through structural design history, finishing at the glass-dome conservatory gardens.",
    coordinates: "North Pavilion • 11:30 AM Sunday"
  },
  {
    id: "s3",
    category: "Minimalist",
    title: "Late-Night Vinyl Lounge Dialogue",
    description: "Low-lit ambient listening bar focused on deep analog acoustics. High-fidelity audio environment designed for zero-distraction speech.",
    coordinates: "Arts District • 9:00 PM Friday"
  }
];

export default function DatePlanner() {
  const [selectedStyle, setSelectedStyle] = useState<"Intellectual" | "Experiential" | "Minimalist">("Intellectual");
  const [proposedCoordinates, setProposedCoordinates] = useState("");
  const [proposedTime, setProposedTime] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const activeSuggestion = mockSuggestions.find(s => s.category === selectedStyle);

  const handleProposeCoordinates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedCoordinates || !proposedTime) return;
    setIsLocked(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12">
      <BackgroundCanvas />
      
      {/* Container with explicit z-index to stay above background */}
      <div className="relative z-10 p-8 bg-[#0d1626]/60 border-2 border-[#c5a059]/40 backdrop-blur-xl rounded-3xl text-left space-y-8 shadow-[0_0_50px_rgba(197,160,89,0.05)]">
        
        <div className="border-b border-white/10 pb-4 space-y-1">
          <h3 className="text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase">
            Alignment Date Coordinates
          </h3>
          <p className="text-xs text-white/60 font-light">
            Design real-world encounters around shared cognitive frameworks.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#0d1626]/40 border border-white/10 rounded-xl">
          {(["Intellectual", "Experiential", "Minimalist"] as const).map((style) => (
            <button
              key={style}
              disabled={isLocked}
              onClick={() => setSelectedStyle(style)}
              className={`py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all duration-300 disabled:opacity-40 ${
                selectedStyle === style
                  ? "bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {activeSuggestion && (
          <div className="p-6 bg-[#0d1626]/40 border border-white/10 rounded-2xl space-y-3">
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] font-bold uppercase tracking-widest">
              Suggested Context
            </span>
            <h4 className="text-sm font-medium text-white">{activeSuggestion.title}</h4>
            <p className="text-xs text-white/70 leading-relaxed font-light">{activeSuggestion.description}</p>
            <p className="text-[10px] text-[#c5a059]/80 font-medium pt-1">Location: {activeSuggestion.coordinates}</p>
          </div>
        )}

        <form onSubmit={handleProposeCoordinates} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Venue</label>
              <input
                type="text"
                disabled={isLocked}
                value={proposedCoordinates}
                onChange={(e) => setProposedCoordinates(e.target.value)}
                placeholder="e.g. Dialogue Records"
                className="w-full bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5a059]/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Time</label>
              <input
                type="datetime-local"
                disabled={isLocked}
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                placeholder="e.g. Saturday 3:00 PM"
                className="w-full bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5a059]/50"
              />
            </div>
          </div>

          {!isLocked ? (
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black font-black text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-200"
            >
              Propose Coordinates ⚡
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-xl flex items-center justify-between"
            >
              <p className="text-[11px] text-white font-medium">
                Proposal: <span className="text-white/70">{proposedCoordinates} at {proposedTime}</span>
              </p>
              <button type="button" onClick={() => setIsLocked(false)} className="text-[9px] text-[#c5a059] font-bold uppercase tracking-wider hover:underline">Modify</button>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}