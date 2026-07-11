"use client";
import { useState, useEffect } from "react";
import MatchCard from "./components/MatchCard";
import ConversationRow from "./components/ConversationRow";
import { BackgroundCanvas } from "../discovery/components/BackgroundCanvas";
import api from "@/src/api/axios";

export default function MatchesPage() {
  const [connections, setConnections] = useState([]);
  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        const [connRes, chatRes] = await Promise.all([
          api.get('/matches/matches/'),
          api.get('/matches/messages/')
        ]);
        setConnections(connRes.data);
        setDialogues(chatRes.data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };
    fetchMatchesData();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0d1626] text-white font-sans overflow-hidden pb-24">
      <BackgroundCanvas />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12 space-y-12 text-left">
        
        {/* NEW CONNECTIONS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xs font-black tracking-[0.3em] text-[#c5a059] uppercase">New Connections</h2>
            <span className="text-[10px] font-medium text-white/30 tracking-wider uppercase">{connections.length} Pending Review</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {connections.map((item: any) => (
              <MatchCard 
                key={item.id}
                id={item.id.toString()}
                name={item.user_two_username || "User"} // Ensure your Serializer provides this
                avatarUrl={`https://ui-avatars.com/api/?name=${item.user_two_username || "U"}&background=0d1626&color=c5a059`}
                matchPercentage={85} // Replace with dynamic data if available
                archetype="Explorer"
              />
            ))}
          </div>
        </div>

        {/* ACTIVE DIALOGUES */}
        <div className="space-y-4">
          <div className="border-b border-white/5 pb-2">
            <h2 className="text-xs font-black tracking-[0.3em] text-[#c5a059] uppercase">Active Dialogues</h2>
          </div>

          <div className="rounded-2xl bg-[#0d1626]/60 border-2 border-[#c5a059]/40 backdrop-blur-xl overflow-hidden divide-y divide-white/5 shadow-[0_0_50px_rgba(197,160,89,0.05)]">
            {dialogues.map((chat: any) => (
              <ConversationRow 
                key={chat.id}
                id={chat.match.toString()}
                name={chat.sender_name}
                avatarUrl={`https://ui-avatars.com/api/?name=${chat.sender_name}&background=0d1626&color=c5a059`}
                latestMessage={chat.content}
                timeAgo={new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                unread={!chat.is_read}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}