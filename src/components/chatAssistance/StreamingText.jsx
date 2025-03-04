import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const StreamingText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 50); // Slightly faster typing speed

      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-blue-500/5 rounded-lg blur-xl" />
      <AnimatePresence mode="wait">
        {displayedText.split(" ").map((word, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mr-1 relative"
          >
            <span className="relative">
              {word}
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: idx * 0.1 }}
              />
            </span>
          </motion.span>
        ))}
      </AnimatePresence>
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-400 ml-0.5 rounded-full"
          animate={{ 
            opacity: [1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-wave" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};