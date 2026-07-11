"use client";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface MessageStreamProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function MessageStream({ messages, messagesEndRef }: MessageStreamProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      {messages.map((msg) => {
        const isMe = msg.sender === "me";
        return (
          <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                isMe 
                  ? "bg-gradient-to-r from-[#c5a059] to-[#8e6e30] text-[#10141b] font-medium rounded-tr-none shadow-[0_4px_15px_rgba(197,160,89,0.15)]" 
                  : "bg-[#181f2b] text-white/90 border border-white/5 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-white/30 mt-1 px-1">{msg.timestamp}</span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}