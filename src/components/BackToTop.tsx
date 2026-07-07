import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 rounded-full border border-slate-200 bg-white p-3 text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};