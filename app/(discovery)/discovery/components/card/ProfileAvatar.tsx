"use client";
import Image from "next/image";

interface ProfileAvatarProps {
  src: string | null | undefined;
}

export function ProfileAvatar({ src }: ProfileAvatarProps) {
  // Validate the source: if it's null, undefined, or empty, render a placeholder
  const isValidSrc = src && src.trim() !== "";

  return (
    <div className="flex justify-center mb-6">
      <div className="w-40 h-40 rounded-full border-[8px] border-[#1a2028] p-1 bg-gradient-to-tr from-[#c5a059] to-[#4a3a1d]">
        <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
          {isValidSrc ? (
            <Image
              src={src!}
              alt="Profile pic"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-[#c5a059] text-xs font-bold uppercase tracking-widest">N/A</div>
          )}
        </div>
      </div>
    </div>
  );
}