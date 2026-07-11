interface FieldProps {
  label: string;
  register: any;
  name: string;
  type?: "text" | "textarea";
  rows?: number;
}

export const CalibrationField = ({ label, register, name, type = "text", rows = 1 }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase text-slate-400">{label}</label>
    {type === "textarea" ? (
      <textarea {...register(name)} rows={rows} className="w-full bg-[#161c26] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:border-[#c5a059] outline-none transition-colors" />
    ) : (
      <input {...register(name)} className="w-full h-10 bg-[#161c26] border border-white/10 rounded-xl px-4 text-sm text-slate-200 focus:border-[#c5a059] outline-none transition-colors" />
    )}
  </div>
);