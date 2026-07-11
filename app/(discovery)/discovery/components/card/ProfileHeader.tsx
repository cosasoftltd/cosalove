"use client";

interface ProfileHeaderProps {
  name: string;
  age: number;
  archetype: string;
}

export function ProfileHeader({ name, age, archetype }: ProfileHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white">{name}, {age}</h2>
      <p className="text-[#c5a059] italic text-sm mt-2">"{archetype}"</p>
    </div>
  );
}