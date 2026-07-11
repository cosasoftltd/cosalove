"use client";

interface DossierVitalsProps {
  valueSystem: string;
  lifestyle: string;
}

export function DossierVitals({ valueSystem, lifestyle }: DossierVitalsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
      <div className="space-y-2">
        <h4 className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Value System</h4>
        <p className="text-sm text-white/70 font-light leading-relaxed">{valueSystem}</p>
      </div>
      <div className="space-y-2">
        <h4 className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Lifestyle Choices</h4>
        <p className="text-sm text-white/70 font-light leading-relaxed">{lifestyle}</p>
      </div>
    </div>
  );
}