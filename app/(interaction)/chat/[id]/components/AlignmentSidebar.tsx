"use client";

interface Partner {
  name: string;
  avatarUrl: string;
  archetype: string;
  alignment: number;
  coreValues: string[];
  bio: string;
}

interface AlignmentSidebarProps {
  partner: Partner;
}

export default function AlignmentSidebar({ partner }: AlignmentSidebarProps) {
  return (
    // Updated background and border to match the lighter "embedded" glass theme
    <div className="w-80 bg-[#1e2532]/90 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col space-y-6 overflow-y-auto hidden md:flex shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#c5a059]/30 p-0.5 bg-[#0d1626] shrink-0">
          <img 
            src={partner.avatarUrl} 
            alt={partner.name} 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-md font-medium text-white">{partner.name}</h2>
          <p className="text-xs text-[#c5a059] font-bold uppercase tracking-wider mt-0.5">{partner.archetype}</p>
        </div>
        <div className="inline-block px-3 py-1 bg-[#c5a059]/10 border border-[#c5a059]/20 rounded-full text-xs text-[#c5a059] font-bold">
          {partner.alignment}% Core Alignment
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dossier Statement</h4>
        <p className="text-xs text-slate-200 leading-relaxed font-light italic">
          "{partner.bio}"
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-3">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Shared Calibration Values</h4>
        <div className="flex flex-wrap gap-1.5">
          {partner.coreValues.map((value, idx) => (
            <span 
              key={idx} 
              className="text-[10px] bg-white/5 text-slate-200 border border-white/10 px-2.5 py-1 rounded-lg font-light"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-end">
        <div className="w-full text-center p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[10px] text-slate-400 leading-normal">
            This dialog is completely unmetered. Take your time writing intentional, deliberate responses.
          </p>
        </div>
      </div>
    </div>
  );
}