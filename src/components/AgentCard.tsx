import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Zap, TrendingUp } from "lucide-react";
import { HireModal } from "./HireModal";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  users: string;
  price: string;
  icon: string;
  color: string;
  glow: string;
  tags: string[];
  featured?: boolean;
}

interface AgentCardProps {
  agent: Agent;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-white/15"
          }`}
        />
      ))}
      <span className="text-xs text-white/40 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export function AgentCard({ agent, index }: AgentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -10, scale: 1.018, transition: { type: "spring", stiffness: 260, damping: 20 } }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: isHovered
            ? "linear-gradient(145deg, rgba(28,32,48,0.98), rgba(18,21,32,0.98))"
            : "rgba(17, 20, 28, 0.92)",
          border: isHovered
            ? `1px solid ${agent.color}55`
            : "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: isHovered
            ? [
                `0 0 0 1px ${agent.color}50`,
                `0 0 20px 4px ${agent.color}45`,
                `0 0 60px 12px ${agent.color}28`,
                `0 0 120px 30px ${agent.color}12`,
                `0 28px 70px rgba(0,0,0,0.6)`,
                `inset 0 1px 0 ${agent.color}22`,
              ].join(", ")
            : "0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease",
        }}
      >
        {/* Top shimmer edge */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, transparent, ${agent.color}90, ${agent.color}cc, ${agent.color}90, transparent)`
              : `linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)`,
            boxShadow: isHovered ? `0 0 12px 2px ${agent.color}50` : "none",
            transition: "background 0.28s ease, box-shadow 0.28s ease",
          }}
        />

        {/* Radial bloom */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% -5%, ${agent.glow}20, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.28s ease",
          }}
        />

        {/* Featured badge */}
        {agent.featured && (
          <div className="absolute top-3 right-3 z-10">
            <div
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(56,139,253,0.12)",
                border: "1px solid rgba(56,139,253,0.3)",
                color: "#79c0ff",
                boxShadow: "0 0 10px rgba(56,139,253,0.15)",
              }}
            >
              <TrendingUp className="w-2.5 h-2.5" />
              HOT
            </div>
          </div>
        )}

        <div className="p-5 relative z-10">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}08)`,
                border: `1px solid ${agent.color}28`,
                boxShadow: `0 0 20px ${agent.color}20, inset 0 1px 0 ${agent.color}15`,
              }}
            >
              {agent.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-sm leading-tight mb-1">{agent.name}</h3>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {agent.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-white/45 leading-relaxed mb-4 line-clamp-2">
            {agent.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating + users */}
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={agent.rating} />
            <div className="flex items-center gap-1 text-[10px] text-white/30">
              <Users className="w-3 h-3" />
              {agent.users}
            </div>
          </div>

          {/* Price + Hire */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-black text-white">{agent.price}</span>
              <span className="text-xs text-white/30 ml-1">NIT/task</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl text-white transition-all"
              style={{
                background: `linear-gradient(135deg, ${agent.color}cc, ${agent.color}88)`,
                border: `1px solid ${agent.color}50`,
                boxShadow: `0 0 16px ${agent.color}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
            >
              <Zap className="w-3 h-3" />
              Hire
            </motion.button>
          </div>
        </div>
      </motion.div>

      <HireModal
        agent={agent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
