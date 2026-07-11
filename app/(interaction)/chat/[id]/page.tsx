"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";

// Components
import ChatHeader from "./components/ChatHeader";
import AlignmentSidebar from "./components/AlignmentSidebar";
import MessageStream from "./components/MessageStream";
import MessageInput from "./components/MessageInput";
import { BackgroundCanvas } from "@/app/(discovery)/discovery/components/BackgroundCanvas";

// Note: Importing a Next.js 'page' into another component is generally an anti-pattern. 
// Consider extracting the core UI of DatePlanner into a shared component (e.g., '@/components/DatePlanner').
import DatePlanner from "../../date-planner/page"; 
import api from "@/src/api/axios";

// --- Types ---
interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: string;
}

interface RawMessage {
  id: string | number;
  is_me: boolean;
  content: string;
  timestamp: string;
}

interface Partner {
  name: string;
  avatarUrl: string;
  alignment: number;
  archetype: string;
  coreValues: string[];
  bio: string;
}

const FALLBACK_AVATAR = 
  "https://static.vecteezy.com/system/resources/thumbnails/059/641/553/small_2x/modern-minimalist-young-woman-avatar-illustration-with-dark-hair-for-digital-profiles-png.png";

export default function ChatRoomPage() {
  const params = useParams();
  // Ensure matchId is a string (useParams can sometimes return string | string[])
  const matchId = Array.isArray(params?.matchId) ? params.matchId[0] : params?.matchId;

  // --- State ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "planner">("chat");
  const [partner, setPartner] = useState<Partner>({
    name: "Loading...",
    avatarUrl: FALLBACK_AVATAR,
    alignment: 0,
    archetype: "---",
    coreValues: [],
    bio: "..."
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // Fetch Chat Data
  useEffect(() => {
    if (!matchId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/matches/messages/?match_id=${matchId}`);
        
        const formattedMessages: Message[] = res.data.map((m: RawMessage) => ({
          id: m.id.toString(),
          sender: m.is_me ? "me" : "them",
          text: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit" 
          })
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error loading chat messages:", err);
      }
    };

    fetchMessages();
    
    // TODO: Add a fetch call here to update the `partner` state 
    // based on the matchId if required.

  }, [matchId]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  // --- Handlers ---
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    const msgContent = inputText.trim();
    if (!msgContent) return;

    // Optimistic UI update
    const newMsg: Message = { 
      id: Date.now().toString(), 
      sender: "me", 
      text: msgContent, 
      timestamp: "Just now" 
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // POST to Django Backend
    try {
      await api.post("/matches/messages/", {
        match: matchId,
        content: msgContent
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      // Optional: Remove the optimistic message or show an error state here
    }
  };

  // --- Render ---
  return (
    <div className="w-full max-w-6xl mx-auto h-[calc(100vh-4rem)] min-h-[500px] px-4 py-4 flex gap-4 text-left">
      <BackgroundCanvas />
      
      <div className="flex-1 bg-[#1e2532]/90 backdrop-blur-md rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        <ChatHeader partner={partner} />

        {/* Tab Controls */}
        <div className="flex border-b border-white/10 bg-white/5 px-4 py-2 gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
              activeTab === "chat" 
                ? "bg-white/10 text-white border border-white/20" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Conversation Channel
          </button>
          <button 
            onClick={() => setActiveTab("planner")} 
            className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
              activeTab === "planner" 
                ? "bg-[#c5a059]/20 text-[#e6c27e] border border-[#c5a059]/30" 
                : "text-slate-400 hover:text-[#c5a059]"
            }`}
          >
            Coordinate Planner ⚡
          </button>
        </div>

        {/* Workspace Display */}
        {activeTab === "chat" ? (
          <>
            <MessageStream 
              messages={messages} 
              messagesEndRef={messagesEndRef} 
            />
            <MessageInput 
              inputText={inputText} 
              setInputText={setInputText} 
              onSubmit={handleSendMessage} 
              placeholderName={partner.name} 
            />
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