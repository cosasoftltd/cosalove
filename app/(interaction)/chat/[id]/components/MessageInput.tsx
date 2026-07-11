"use client";

interface MessageInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholderName: string;
}

export default function MessageInput({ inputText, setInputText, onSubmit, placeholderName }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-white/5 bg-[#131922]/30 backdrop-blur-md flex gap-2 shrink-0">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`Message ${placeholderName}...`}
        className="flex-1 bg-[#161c26] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059]/40 transition-colors"
      />
      <button 
        type="submit" 
        className="px-5 py-2.5 rounded-xl bg-[#161c26] border border-[#c5a059]/30 hover:bg-[#c5a059] text-[#c5a059] hover:text-[#10141b] font-bold text-xs uppercase tracking-widest transition-all duration-200 shrink-0"
      >
        Send
      </button>
    </form>
  );
}