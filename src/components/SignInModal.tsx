import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Eye, EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "signin" | "signup";
}

export function SignInModal({ open, onClose, mode: initialMode = "signin" }: SignInModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    setTimeout(() => { onClose(); setDone(false); }, 1000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
          >
            <div
              className="relative w-full max-w-sm mx-4 rounded-2xl p-7 pointer-events-auto"
              style={{
                background: "rgba(13,17,23,0.98)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "0 0 0 1px rgba(56,139,253,0.1), 0 0 60px 12px rgba(56,139,253,0.08), 0 32px 80px rgba(0,0,0,0.7)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top shimmer */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(56,139,253,0.6), transparent)" }}
              />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:bg-white/5"
                style={{ color: "rgba(230,237,243,0.4)" }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Logo */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: "linear-gradient(135deg,#388bfd,#7c3aed)",
                    boxShadow: "0 0 24px rgba(56,139,253,0.5)",
                  }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  {done ? "Welcome!" : mode === "signin" ? "Sign in to AgentHub" : "Create your account"}
                </h2>
                {!done && (
                  <p className="text-xs mt-1" style={{ color: "rgba(230,237,243,0.4)" }}>
                    {mode === "signin"
                      ? "Enter your credentials to continue"
                      : "Join 98,000+ users on the platform"}
                  </p>
                )}
              </div>

              {done ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center py-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}
                  >
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {mode === "signin" ? "Signed in successfully!" : "Account created!"}
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* GitHub button */}
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mb-4 transition-all hover:opacity-85 active:scale-[0.98]"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#e6edf3",
                    }}
                  >
                    <FaGithub className="w-4 h-4" />
                    Continue with GitHub
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="text-[11px]" style={{ color: "rgba(230,237,243,0.3)" }}>or</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {mode === "signup" && (
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>
                          Full name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            color: "#e6edf3",
                          }}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(56,139,253,0.5)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.09)"; }}
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>
                        Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          color: "#e6edf3",
                        }}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(56,139,253,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.09)"; }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full rounded-xl px-3 py-2.5 pr-10 text-sm outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            color: "#e6edf3",
                          }}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(56,139,253,0.5)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.09)"; }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: "rgba(230,237,243,0.35)" }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {mode === "signin" && (
                      <div className="flex justify-end">
                        <button type="button" className="text-[11px] transition-opacity hover:opacity-80" style={{ color: "#58a6ff" }}>
                          Forgot password?
                        </button>
                      </div>
                    )}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all mt-1"
                      style={{
                        background: loading ? "rgba(56,139,253,0.5)" : "linear-gradient(135deg, #388bfd, #7c3aed)",
                        boxShadow: loading ? "none" : "0 0 20px rgba(56,139,253,0.3)",
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {mode === "signin" ? "Signing in..." : "Creating account..."}
                        </span>
                      ) : (
                        mode === "signin" ? "Sign in" : "Create account"
                      )}
                    </motion.button>
                  </form>

                  <p className="text-center text-xs mt-4" style={{ color: "rgba(230,237,243,0.35)" }}>
                    {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      className="font-medium transition-opacity hover:opacity-80"
                      style={{ color: "#58a6ff" }}
                      onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    >
                      {mode === "signin" ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
