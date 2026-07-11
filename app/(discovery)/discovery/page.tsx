"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/src/api/axios";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { DiscoveryCanvas } from "./components/DiscoveryCanvas";

export default function DiscoveryPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get('/dossiers/matches/');
        setMatches(data);
      } catch (err) {
        console.error("Discovery stream error:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <motion.main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden bg-[#0b121c]">
      <BackgroundCanvas />
      <motion.div className="relative z-10 w-full max-w-xl mx-auto flex items-center justify-center mt-16">
        <DiscoveryCanvas users={matches} />
      </motion.div>
    </motion.main>
  );
}