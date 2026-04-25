import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Search, ChevronDown, Bell, Store, Bot, Wrench,
  Coins, Tag, ArrowLeft,
} from "lucide-react";

export type View = "home" | "marketplace" | "my-agents" | "builder" | "earnings" | "pricing";

interface AppNavProps {
  activeView: View;
  onNavigate: (v: View) => void;
  onSignIn: (mode?: "signin" | "signup") => void;
}

const NAV_LINKS: { label: string; view: View; icon: React.ElementType }[] = [
  { label: "Marketplace", view: "marketplace", icon: Store   },
  { label: "My Agents",   view: "my-agents",   icon: Bot     },
  { label: "Builder",     view: "builder",      icon: Wrench  },
  { label: "Earnings",    view: "earnings",     icon: Coins   },
  { label: "Pricing",     view: "pricing",      icon: Tag     },
];

export function AppNav({ activeView, onNavigate, onSignIn }: AppNavProps) {
  const [search, setSearch] = useState("");

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,12,18,0.95)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(56,139,253,0.04), 0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center gap-4">

        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 shrink-0 group"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#388bfd,#7c3aed)",
              boxShadow: "0 0 14px rgba(56,139,253,0.45)",
            }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display text-sm font-black text-white tracking-tight hidden sm:block">
            AgentHub
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-5 shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Nav links */}
        <nav className="flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150"
                style={{
                  color: isActive ? "#e6edf3" : "rgba(230,237,243,0.55)",
                  background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#e6edf3";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(230,237,243,0.55)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="app-nav-indicator"
                    className="absolute inset-x-2 -bottom-[9px] h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #388bfd, transparent)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(110,118,129,0.75)",
              minWidth: 180,
            }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or jump to..."
              className="flex-1 bg-transparent text-[13px] outline-none placeholder-transparent"
              style={{ color: "rgba(230,237,243,0.7)" }}
            />
            {!search && <span style={{ color: "rgba(110,118,129,0.6)" }} className="pointer-events-none">Search...</span>}
            <kbd
              className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
              style={{
                background: "rgba(48,54,61,0.7)",
                color: "rgba(110,118,129,0.7)",
                border: "1px solid rgba(48,54,61,0.9)",
              }}
            >
              /
            </kbd>
          </div>

          {/* NIT Coins */}
          <button
            onClick={() => onNavigate("earnings")}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all hover:opacity-90"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <div
              className="w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)" }}
            >
              N
            </div>
            <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>2,847</span>
          </button>

          {/* Notifications */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/5 relative"
            style={{ color: "rgba(230,237,243,0.5)" }}
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "#388bfd", boxShadow: "0 0 6px rgba(56,139,253,0.8)" }}
            />
          </button>

          {/* Avatar */}
          <button
            onClick={() => onSignIn("signin")}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white transition-all hover:opacity-90 hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4c1d95)",
              boxShadow: "0 0 10px rgba(124,58,237,0.4)",
            }}
          >
            D
          </button>
        </div>
      </div>
    </header>
  );
}
