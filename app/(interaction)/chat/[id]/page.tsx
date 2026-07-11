"use client";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import ChatHeader from "./components/ChatHeader";
import AlignmentSidebar from "./components/AlignmentSidebar";
import DatePlanner from "../../date-planner/page";
import MessageStream from "./components/MessageStream";
import MessageInput from "./components/MessageInput";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";
import api from "@/src/api/axios";

const FALLBACK_AVATAR = "https://static.vecteezy.com/system/resources/thumbnails/059/641/553/small_2x/modern-minimalist-young-woman-avatar-illustration-with-dark-hair-for-digital-profiles-png.png";

export default function ChatRoomPage() {
  const { matchId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "planner">("chat");
  const [partner, setPartner] = useState({
    name: "Loading...",
    avatarUrl: FALLBACK_AVATAR,
    alignment: 0,
    archetype: "---",
    coreValues: [],
    bio: "..."
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Chat Data
  useEffect(() => {
    if (!matchId) return;

    const fetchData = async () => {
      try {
        const res = await api.get(`/matches/messages/?match_id=${matchId}`);
        // Transform API messages to fit your component requirements
        const formattedMessages = res.data.map((m: any) => ({
          id: m.id,
          sender: m.is_me ? "me" : "them",
          text: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error loading chat:", err);
      }
    };
    fetchData();
  }, [matchId]);

  // Handle Send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const msgContent = inputText.trim();
    
    // Optimistic UI update
    const newMsg = { 
      id: Date.now().toString(), 
      sender: "me", 
      text: msgContent, 
      timestamp: "Just now" 
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // POST to Django
    try {
      await api.post('/matches/messages/', {
        match: matchId,
        content: msgContent
      });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  return (
    <div className="w-full max-w-6xl mx-auto h-[calc(100vh-4rem)] min-h-[500px] px-4 py-4 flex gap-4 text-left">
      <BackgroundCanvas/>
      <div className="flex-1 bg-[#1e2532]/90 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        <ChatHeader partner={partner} />

        {/* Tab Controls */}
        <div className="flex border-b border-white/10 bg-white/5 px-4 py-2 gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === "chat" ? "bg-white/10 text-white border border-white/20" : "text-slate-400 hover:text-white"}`}
          >
            Conversation Channel
          </button>
          <button 
            onClick={() => setActiveTab("planner")} 
            className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === "planner" ? "bg-[#c5a059]/20 text-[#e6c27e] border border-[#c5a059]/30" : "text-slate-400 hover:text-[#c5a059]"}`}
          >
            Coordinate Planner ⚡
          </button>
        </div>

        {/* Workspace Display */}
        {activeTab === "chat" ? (
          <>
            <MessageStream messages={messages} messagesEndRef={messagesEndRef} />
            <MessageInput inputText={inputText} setInputText={setInputText} onSubmit={handleSendMessage} placeholderName={partner.name} />
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="w-full max-w-2xl">
              <DatePlanner />
            </div>
          </div>
        )}
      </div>

      <AlignmentSidebar partner={partner} />
    </div>
  );
}