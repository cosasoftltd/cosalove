"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { BackgroundCanvas } from "../discovery/components/BackgroundCanvas";

const steps = [
  { id: "identity", label: "Core Identity" },
  { id: "philosophy", label: "Philosophy & Values" },
  { id: "lifestyle", label: "Lifestyle & Prompts" }
];

export default function ProfileCalibrationPage() {
  const [step, setStep] = useState(0);
  // Initializing useForm here so the state persists across steps
  const methods = useForm({
    defaultValues: {
      bio: "",
      philosophy: "",
      valueSystem: "",
      lifestyle: "",
      promptQuote: ""
    }
  });

  const onSubmit = (data: any) => console.log("Final Calibration Data:", data);

  return (
    // We use FormProvider to allow nested components to register inputs easily
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="relative w-full min-h-screen bg-[#1e2532] p-6 pb-32 flex flex-col items-center">
        <BackgroundCanvas />

        <div className="w-full max-w-2xl z-10 space-y-8 pt-10">
          {/* Progress Tracker */}
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-[#c5a059]" : "bg-white/10"}`} />
            ))}
          </div>

          {/* Form Step Area */}
          <div className="bg-[#1e2532]/90 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl space-y-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl text-white font-medium">Core Identity</h2>
                <textarea {...methods.register("bio")} placeholder="Describe your essence..." className="w-full h-40 bg-[#161c26] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 outline-none focus:border-[#c5a059]" />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl text-white font-medium">Philosophy & Values</h2>
                <textarea {...methods.register("philosophy")} placeholder="What drives your curiosity?" className="w-full h-24 bg-[#161c26] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 outline-none focus:border-[#c5a059]" />
                <textarea {...methods.register("valueSystem")} placeholder="Define your execution principles..." className="w-full h-24 bg-[#161c26] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 outline-none focus:border-[#c5a059]" />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl text-white font-medium">Lifestyle & Focus</h2>
                <textarea {...methods.register("lifestyle")} placeholder="How do you spend your deep work blocks?" className="w-full h-24 bg-[#161c26] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 outline-none focus:border-[#c5a059]" />
                <textarea {...methods.register("promptQuote")} placeholder="Your signature focus quote..." className="w-full h-24 bg-[#161c26] border border-white/10 rounded-2xl p-4 text-sm text-slate-200 outline-none focus:border-[#c5a059]" />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)} className="text-xs font-bold uppercase text-slate-500 disabled:opacity-0">Back</button>
            <button 
              type={step === steps.length - 1 ? "submit" : "button"} 
              onClick={() => step < steps.length - 1 && setStep(s => s + 1)} 
              className="px-8 py-3 rounded-full bg-[#c5a059] text-[#1e2532] text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
            >
              {step === steps.length - 1 ? "Commit Changes" : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}