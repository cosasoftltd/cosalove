"use client";

interface PreferenceSelectorProps {
  label: string;
  options: { id: string; name: string }[];
  selectedValue: string;
  onChange: (id: string) => void;
}

export default function PreferenceSelector({ label, options, selectedValue, onChange }: PreferenceSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`h-10 rounded-xl border text-[11px] font-medium tracking-wide transition-all duration-300
                ${isSelected 
                  ? "bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.1)]" 
                  : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/10"
                }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}