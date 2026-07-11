import { CalibrationField } from "./CalibrationField";

export const DossierForm = ({ register }: { register: any }) => (
  <div className="md:col-span-2 space-y-5 bg-[#1e2532]/90 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <h3 className="text-xs font-bold uppercase text-slate-300 border-b border-white/10 pb-2">Full Dossier Calibration</h3>
    
    <CalibrationField label="Bio" register={register} name="bio" type="textarea" rows={2} />
    
    <div className="grid grid-cols-2 gap-4">
      <CalibrationField label="Occupation" register={register} name="occupation" />
      <CalibrationField label="Height" register={register} name="height" />
    </div>

    <CalibrationField label="Philosophy" register={register} name="philosophy" type="textarea" rows={2} />
    <CalibrationField label="Value System" register={register} name="valueSystem" type="textarea" rows={2} />
    <CalibrationField label="Lifestyle" register={register} name="lifestyle" type="textarea" rows={2} />
    <CalibrationField label="Personal Prompt Quote" register={register} name="promptQuote" type="textarea" rows={1} />
  </div>
);