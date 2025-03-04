import { motion } from "framer-motion";

export const TypingAnimation = () => {
  return (
    <div className="flex space-x-2 p-3 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-red-100 border border-red-500/10 rounded-2xl max-w-[85%]">
      <motion.div
        className="w-2 h-2 bg-red-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="w-2 h-2 bg-red-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="w-2 h-2 bg-red-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};