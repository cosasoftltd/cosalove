"use client";

interface MatchCardProps {
  id: string;
  name: string;
  avatarUrl: string;
  matchPercentage: number;
  archetype: string;
}

export default function MatchCard({ id, name, avatarUrl, matchPercentage, archetype }: MatchCardProps) {
  return (
    <div
      onClick={() => window.location.href = `/chat/${id}`}
      // Updated: Unified background, thicker border, and removed heavy shadow
      className="group relative cursor-pointer rounded-2xl bg-[#0d1626]/60 border-2 border-[#c5a059]/20 hover:border-[#c5a059]/60 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(197,160,89,0.05)]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#c5a059]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-[#0d1626] border border-[#c5a059]/30 text-[9px] font-black text-[#c5a059] tracking-wider uppercase">
        {matchPercentage}% Match
      </div>

      <div className="flex flex-col items-center text-center space-y-4 pt-2">
        {/* Profile Avatar Container */}
        <div className="relative w-20 h-20 rounded-full p-0.5 border-2 border-[#c5a059]/20 group-hover:border-[#c5a059]/60 transition-colors duration-300 overflow-hidden bg-[#0d1626]">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover rounded-full scale-95 group-hover:scale-100 transition-transform duration-300"
          />
        </div>
        
        <div>
          <h3 className="text-md font-medium text-white group-hover:text-[#c5a059] transition-colors duration-200">
            {name}
          </h3>
          <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase font-bold mt-1">
            {archetype}
          </p>
        </div>
      </div>
    </div>
  );
}