"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/src/api/axios";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      if (!isLogin) {
        // REGISTER FLOW: Create account, then auto-login to Onboarding
        await api.post("/users/register/", { username: data.username, password: data.password, email: data.email });
        const loginRes = await api.post("/users/login/", { username: data.username, password: data.password });
        localStorage.setItem("token", loginRes.data.token);
        router.push("/onboarding");
      } else {
        // LOGIN FLOW: Log in, then send to Discovery
        const res = await api.post("/users/login/", { username: data.username, password: data.password });
        localStorage.setItem("token", res.data.token);
        router.push("/discovery");
      }
    } catch (err) {
      console.error("Auth failed", err);
      alert("Auth failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 flex-col gap-20">
      <BackgroundCanvas />
      <h1 className="z-50 text-4xl text-gold">CosaLove</h1>
      <form onSubmit={handleSubmit(onSubmit)} 
        className="relative z-10 w-full max-w-sm bg-[#0d1626]/60 backdrop-blur-xl border-2 border-[#c5a059]/40 rounded-2xl p-8 space-y-4 text-white shadow-2xl"
      >
        <h1 className="text-xl font-bold text-center mb-6">{isLogin ? "Welcome Back" : "Identity Creation"}</h1>
        
        <input {...register("username", { required: true })} placeholder="Username" className="w-full h-11 bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 text-sm" />
        
        {!isLogin && (
          <input {...register("email", { required: true })} type="email" placeholder="Email" className="w-full h-11 bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 text-sm" />
        )}
        
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="w-full h-11 bg-[#0d1626]/40 border border-white/10 rounded-xl px-4 text-sm" />
        
        <button type="submit" className="w-full h-12 bg-gradient-to-r from-[#c5a059] to-[#b38f4b] text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all">
          {isLogin ? "SIGN IN" : "INITIATE ONBOARDING"}
        </button>
        
        <button type="button" className="w-full text-[10px] opacity-40 hover:opacity-100 transition-opacity" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an identity? Register." : "Already calibrated? Sign in."}
        </button>
      </form>
    </div>
  );
}