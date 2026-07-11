import Link from "next/link";

export default function DiscoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Discover", path: "/discovery" },
    { name: "Matches", path: "/matches" },
    { name: "Plan", path: "/date-planner" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#1e2532] text-white font-sans overflow-hidden">
      
      {/* Main Content Area - Added 'min-h-screen' to ensure consistency */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 pb-24 min-h-screen">
        {children}
      </main>

      {/* Refined Premium Glassmorphic Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#1e2532]/60 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-6 max-w-lg mx-auto rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.15)]">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className="group flex flex-col items-center gap-1 transition-all duration-300"
          >
            <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 group-hover:text-[#c5a059] transition-colors duration-200">
              {item.name}
            </span>
            {/* Optional indicator line for active state could go here */}
          </Link>
        ))}
      </nav>
    </div>
  );
}