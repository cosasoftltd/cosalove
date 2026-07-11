interface ConversationRowProps {
  id: string;
  name: string;
  avatarUrl: string;
  latestMessage: string;
  timeAgo: string;
  unread: boolean;
}

export default function ConversationRow({ id, name, avatarUrl, latestMessage, timeAgo, unread }: ConversationRowProps) {
  return (
    <div
      onClick={() => window.location.href = `/chat/${id}`}
      className="group flex items-center justify-between p-4 cursor-pointer hover:bg-[#c5a059]/5 transition-colors duration-200"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-full border border-[#c5a059]/20 overflow-hidden bg-[#0d1626] shrink-0">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <h4 className="text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors duration-200">
            {name}
          </h4>
          <p className={`text-xs truncate max-w-xl font-light ${unread ? "text-white/90 font-normal" : "text-white/40"}`}>
            {latestMessage}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <span className="text-[10px] text-white/30 font-light tracking-wide">{timeAgo}</span>
        {unread && (
          <div className="w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_10px_#c5a059]" />
        )}
      </div>
    </div>
  );
}