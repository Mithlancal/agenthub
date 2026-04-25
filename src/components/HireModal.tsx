import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Mail, Zap, FileText } from "lucide-react";
import type { Agent } from "./AgentCard";

interface HireModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "processing" | "success";

export function HireModal({ agent, isOpen, onClose }: HireModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({
    task: "",
    context: "",
    deadline: "asap",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2800));
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setFormData({ task: "", context: "", deadline: "asap", email: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && step === "form" && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13, 17, 23, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${agent.color}60, transparent)`,
              }}
            />

            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between p-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                        style={{
                          background: `linear-gradient(135deg, ${agent.color}30, ${agent.color}10)`,
                          border: `1px solid ${agent.color}30`,
                        }}
                      >
                        {agent.icon}
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Hire {agent.name}</h2>
                        <p className="text-xs text-white/40">{agent.price}/task</p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                        Task Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.task}
                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        placeholder={`e.g. "Find all refund opportunities in my last 3 months of orders"`}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white/90 placeholder-white/20 resize-none transition-all outline-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${agent.color}50`;
                          e.target.style.boxShadow = `0 0 0 3px ${agent.color}10`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.08)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                        Additional Context
                      </label>
                      <input
                        type="text"
                        value={formData.context}
                        onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                        placeholder="Any extra info the agent should know..."
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white/90 placeholder-white/20 transition-all outline-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${agent.color}50`;
                          e.target.style.boxShadow = `0 0 0 3px ${agent.color}10`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.08)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                        Deadline
                      </label>
                      <select
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white/90 transition-all outline-none appearance-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <option value="asap" style={{ background: "#0d1117" }}>ASAP (fastest)</option>
                        <option value="1h" style={{ background: "#0d1117" }}>Within 1 hour</option>
                        <option value="24h" style={{ background: "#0d1117" }}>Within 24 hours</option>
                        <option value="custom" style={{ background: "#0d1117" }}>Custom timeline</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wide">
                        Notify me at
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-white/90 placeholder-white/20 transition-all outline-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${agent.color}50`;
                          e.target.style.boxShadow = `0 0 0 3px ${agent.color}10`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.08)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <span className="text-xs text-white/40">Estimated cost</span>
                      <span className="text-sm font-bold text-yellow-400">{agent.price} NIT</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${agent.color}, ${agent.color}90)`,
                        boxShadow: `0 4px 20px ${agent.color}30`,
                      }}
                    >
                      <Zap className="w-4 h-4" />
                      Deploy Agent
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-10 flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full"
                      style={{
                        border: `2px solid ${agent.color}20`,
                        borderTopColor: agent.color,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      {agent.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Agent Working...</h3>
                  <p className="text-sm text-white/40 mb-6">
                    {agent.name} is processing your request
                  </p>
                  <div className="w-full space-y-2">
                    {["Connecting to agent network", "Analyzing your task", "Executing workflow"].map(
                      (step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.7 }}
                          className="flex items-center gap-2 text-xs text-white/40"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.7 + 0.2 }}
                          >
                            <Loader2 className="w-3 h-3 animate-spin" style={{ color: agent.color }} />
                          </motion.div>
                          {step}
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-5"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(52, 211, 153, 0.1)",
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        boxShadow: "0 0 30px rgba(52, 211, 153, 0.2)",
                      }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-base font-bold text-white mb-2">Task Completed!</h3>
                  <p className="text-sm text-white/50 mb-6">
                    Draft created and ready to review
                  </p>
                  <div
                    className="w-full rounded-xl p-4 mb-6 text-left"
                    style={{
                      background: "rgba(52, 211, 153, 0.05)",
                      border: "1px solid rgba(52, 211, 153, 0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">Draft Created in Gmail</span>
                    </div>
                    <p className="text-xs text-white/50">
                      Subject: Re: Your Request — AI Agent Response
                    </p>
                    <p className="text-[11px] text-white/30 mt-1">
                      Saved to Drafts · 1 attachment
                    </p>
                  </div>
                  <div
                    className="w-full rounded-xl p-3 mb-5 flex items-center gap-2"
                    style={{
                      background: "rgba(251, 191, 36, 0.06)",
                      border: "1px solid rgba(251, 191, 36, 0.12)",
                    }}
                  >
                    <FileText className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span className="text-xs text-white/50">
                      <span className="text-yellow-400 font-semibold">{agent.price} NIT</span> deducted from your wallet
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #34d399, #059669)",
                      boxShadow: "0 4px 20px rgba(52, 211, 153, 0.25)",
                    }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
