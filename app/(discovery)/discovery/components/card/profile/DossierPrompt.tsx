"use client";

export function DossierPrompt({ label, quote }: { label: string; quote: string }) {
  return (
    <div className="border-t border-white/5 pt-8 space-y-4">
      <h4 className="text-[10px] text-white/40 font-bold tracking-widest uppercase">{label}</h4>
      <blockquote className="border-l-2 border-[#c5a059] pl-4 italic text-sm text-white/80 font-serif">
        "{quote}"
      </blockquote>
    </div>
  );
}