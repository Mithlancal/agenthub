import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const LOADING_STEPS = [
  "Disarming wards...",
  "Aligning arithmantic grids...",
  "Igniting Floo connections...",
  "Unfurling parchments..."
];

export function PageLoader({ isVisible }: { isVisible: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStepIndex(0);
      return;
    }
    
    // Cycle through the loading steps quickly
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "rgba(10,12,18,0.85)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Pulsing Magical Core */}
            <div className="relative flex items-center justify-center w-16 h-16 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px dashed rgba(167,139,250,0.4)",
                  borderTopColor: "#a78bfa",
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(167,139,250,0.8) 0%, transparent 70%)",
                  boxShadow: "0 0 20px rgba(167,139,250,0.5)"
                }}
              />
              <Sparkles className="w-5 h-5 text-white relative z-10" />
            </div>

            {/* Dynamic Text */}
            <div className="h-6 overflow-hidden relative w-64 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono font-bold tracking-widest uppercase text-white/70 absolute inset-0"
                >
                  {LOADING_STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* Progress Bar */}
            <div className="w-48 h-0.5 mt-4 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="h-full"
                style={{ background: "linear-gradient(90deg, #388bfd, #a78bfa)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}