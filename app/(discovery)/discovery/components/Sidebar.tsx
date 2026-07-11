"use client";

export function Sidebar() {
  return (
    <div className="w-full max-w-[280px] bg-black/30 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6">Filters</h2>
      {/* Add your Filter buttons here */}
      <div className="space-y-4">
        <div className="h-12 border border-white/10 rounded-lg flex items-center px-4 text-white/70">Location</div>
        <div className="h-12 border border-white/10 rounded-lg flex items-center px-4 text-white/70">Age Range</div>
      </div>
      <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-bold uppercase tracking-widest">
        Reset Daily
      </button>
    </div>
  );
}