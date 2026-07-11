"use client";

interface Partner {
  name: string;
  avatarUrl: string;
  archetype: string;
  alignment: number;
}

interface ChatHeaderProps {
  partner: Partner;
}

export default function ChatHeader({ partner }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#131922]/50 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3">
        {/* Premium Back Button */}
        <button 
          onClick={() => window.location.href = "/chat"} 
          className="mr-1 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-white/40 hover:text-white transition-all duration-200 flex items-center justify-center group"
          title="Return to Dialogues"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5a059]/20 shrink-0 bg-slate-900">
          <img 
            src={partner.avatarUrl} 
            alt={partner.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">{partner.name}</h3>
          <p className="text-[10px] text-[#c5a059] tracking-wider uppercase font-semibold mt-0.5">
            {partner.archetype} • {partner.alignment}% Match
          </p>
        </div>
      </div>
    </div>
  );
}