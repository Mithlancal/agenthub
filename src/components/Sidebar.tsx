import { motion } from "framer-motion";
import {
  Home,
  Store,
  Bot,
  Wrench,
  Coins,
  Zap,
  ChevronRight,
} from "lucide-react";

type View = "home" | "marketplace" | "my-agents" | "builder" | "earnings";

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

const navItems = [
  { id: "home" as View, label: "Home", icon: Home, badge: null },
  { id: "marketplace" as View, label: "Marketplace", icon: Store, badge: null },
  { id: "my-agents" as View, label: "My Agents", icon: Bot, badge: "3" },
  { id: "builder" as View, label: "Builder", icon: Wrench, badge: null },
  { id: "earnings" as View, label: "Earnings", icon: Coins, badge: null },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="w-64 h-screen flex flex-col fixed left-0 top-0 z-50"
      style={{
        background: "rgba(8, 10, 14, 0.92)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(48, 54, 61, 0.8)",
        boxShadow: "4px 0 32px rgba(0,0,0,0.5), inset -1px 0 0 rgba(56,139,253,0.04)",
      }}
    >
      {/* ── Logo (clickable → Home) ── */}
      <motion.div
        whileHover={{ opacity: 0.85 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onNavigate("home")}
        className="p-5 cursor-pointer select-none"
        style={{ borderBottom: "1px solid rgba(48,54,61,0.6)" }}
        title="Go to Home"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #388bfd 0%, #7c3aed 100%)",
              boxShadow: "0 0 20px rgba(56,139,253,0.45), 0 0 40px rgba(56,139,253,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <Zap className="w-5 h-5 text-white relative z-10" />
          </div>
          <div>
            <h1 className="font-display text-sm font-black text-white tracking-tight leading-none">AgentHub</h1>
            <p className="text-[10px] mt-0.5 font-medium" style={{ color: "rgba(110,118,129,0.8)" }}>AI Marketplace</p>
          </div>
        </div>
      </motion.div>

      {/* ── Nav items ── */}
      <div className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-3" style={{ color: "rgba(110,118,129,0.6)" }}>
          Navigate
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <motion.div
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(56,139,253,0.15)", color: "#58a6ff", border: "1px solid rgba(56,139,253,0.25)" }}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3 h-3 opacity-40" />}
            </motion.div>
          );
        })}
      </div>

      {/* ── NIT-Coins ── */}
      <div className="px-3 pb-3">
        <div
          className="rounded-xl p-3 shimmer relative overflow-hidden"
          style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.14)", boxShadow: "0 0 20px rgba(251,191,36,0.05), inset 0 1px 0 rgba(251,191,36,0.07)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)" }} />
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 0 16px rgba(245,158,11,0.35)" }}>
              N
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "rgba(230,237,243,0.6)" }}>NIT-Coins</p>
              <p className="text-sm font-black text-yellow-400">2,847 NIT</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── User ── */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(48,54,61,0.6)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 12px rgba(124,58,237,0.4)" }}>
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "rgba(230,237,243,0.65)" }}>dev@agenthub.ai</p>
            <p className="text-[10px]" style={{ color: "rgba(110,118,129,0.7)" }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
