"use client";

export function DossierPhilosophy({ text }: { text: string }) {
  return (
    <div className="border-t border-white/5 pt-6">
      <h3 className="text-xs tracking-widest text-[#c5a059] font-bold uppercase mb-4">The Philosophy</h3>
      <p className="text-sm text-white/70 leading-relaxed font-light">{text}</p>
    </div>
  );
}