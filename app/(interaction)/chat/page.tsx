"use client";
import { useState, useEffect } from "react";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";
import api from "@/src/api/axios";

export default function ChatInboxPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDialogues = async () => {
      try {
        const res = await api.get('/matches/messages/');
        setConversations(res.data);
      } catch (error) {
        console.error("Failed to fetch dialogues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDialogues();
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-12 space-y-8 min-h-screen text-left">
      <BackgroundCanvas />
      
      <div className="relative z-10 space-y-8">
        {/* Inbox Header */}
        <div className="space-y-1 border-b border-white/5 pb-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-bold">
            Dialogues
          </h2>
          <p className="text-xs text-white/40 font-light">
            Your persistent, unmetered conceptual alignment rooms.
          </p>
        </div>

        {/* Conversations Stack */}
        {!loading && conversations.length > 0 ? (
          <div className="bg-[#0d1626]/60 border-2 border-[#c5a059]/20 backdrop-blur-xl rounded-2xl overflow-hidden divide-y divide-white/5 shadow-[0_0_50px_rgba(197,160,89,0.05)]">
            {conversations.map((chat: any) => (
              <div
                key={chat.id}
                onClick={() => window.location.href = `/chat/${chat.match}`}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer group hover:bg-[#c5a059]/5 transition-all duration-300 relative"
              >
                {/* Identity Segment */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#c5a059]/30 bg-[#0d1626] shrink-0">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${chat.sender_name}&background=0d1626&color=c5a059`}
                      alt={chat.sender_name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors">
                        {chat.sender_name}
                      </span>
                    </div>
                    <p className={`text-xs truncate mt-1 max-w-md ${
                      !chat.is_read ? "text-white/90 font-medium" : "text-white/40"
                    }`}>
                      {chat.content}
                    </p>
                  </div>
                </div>

                {/* Analytics Metadata */}
                <div className="text-right shrink-0 ml-2 flex flex-col items-end gap-2">
                  <span className="text-[10px] text-white/30 font-light">
                    {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex items-center gap-2">
                    {!chat.is_read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_10px_#c5a059]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
            <p className="text-xs text-white/30 italic">
              {loading ? "Loading conversations..." : "No active alignment dialogues established yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}