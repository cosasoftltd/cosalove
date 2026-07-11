interface SidebarProps {
  register: any;
  watchedDistance: string;
  saveStatus: string;
}

export const CalibrationSidebar = ({ register, watchedDistance, saveStatus }: SidebarProps) => (
  <div className="md:col-span-1 space-y-5 bg-[#1e2532]/90 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <h3 className="text-xs font-bold uppercase text-slate-300 border-b border-white/10 pb-2">Filters</h3>
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Max Radius</span>
        <span className="text-[#c5a059]">{watchedDistance} miles</span>
      </div>
      <input type="range" {...register("maxDistance")} className="w-full h-1 bg-[#161c26] rounded-full appearance-none cursor-pointer accent-[#c5a059]" />
    </div>
    <button type="submit" className="w-full h-10 mt-4 rounded-xl bg-[#c5a059] text-[#1e2532] text-xs font-black uppercase tracking-wider hover:bg-white transition-all duration-300">
      {saveStatus === "saved" ? "Saved ✓" : "Commit Changes"}
    </button>
  </div>
);