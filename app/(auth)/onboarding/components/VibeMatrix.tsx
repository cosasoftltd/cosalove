"use client";

export interface VibeOption {
  id: string;
  label: string;
  emoji: string;
}

interface VibeMatrixProps {
  options: VibeOption[];
  selectedVibes: string[];
  onToggleVibe: (id: string) => void;
}

export default function VibeMatrix({ options, selectedVibes, onToggleVibe }: VibeMatrixProps) {
  return (
    <div className="space-y-2.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
        Select Your Frequency
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((vibe) => {
          const isSelected = selectedVibes.includes(vibe.id);
          return (
            <button
              key={vibe.id}
              type="button"
              onClick={() => onToggleVibe(vibe.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? "bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.1)]"
                  : "bg-white/[0.01] border-white/5 text-white/60 hover:border-white/10"
              }`}
            >
              <span className="text-xs">{vibe.emoji}</span>
              <span className="text-[11px] font-medium tracking-wide">{vibe.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}