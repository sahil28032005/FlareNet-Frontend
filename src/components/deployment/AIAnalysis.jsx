import { motion } from "framer-motion";
import { StreamingText } from "../chatAssistance/StreamingText";
import React, { useState, useEffect } from "react";

export const AIAnalysis = ({ analysisData = [] }) => {
  const [displayedAnalysis, setDisplayedAnalysis] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (analysisData.length > displayedAnalysis.length) {
      setCurrentItem(analysisData[displayedAnalysis.length]);
      setIsStreaming(true);
    }
  }, [analysisData, displayedAnalysis]);

  const handleStreamComplete = () => {
    if (currentItem) {
      setDisplayedAnalysis(prev => [...prev, currentItem]);
      setIsStreaming(false);
      setCurrentItem(null);
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case "ERROR":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      case "WARNING":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "INFO":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "SUCCESS":
      case "UPLOAD_SUCCESS":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <div className="rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 
                    hover:border-blue-500/30 transition-all duration-500 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 
                       bg-clip-text text-transparent">AI Analysis</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 
                         border border-purple-500/30 text-sm">INSIGHTS</span>
          {isStreaming && (
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="h-[400px] overflow-y-auto rounded-xl bg-slate-900/50 p-4 space-y-3">
        {displayedAnalysis.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={item.log_event_id || index}
            className={`p-4 rounded-lg border ${getClassificationColor(item.classification)}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{item.classification}</span>
              <span className="text-xs opacity-70">{new Date(item.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm">{item.reasoning}</p>
          </motion.div>
        ))}
        
        {isStreaming && currentItem && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${getClassificationColor(currentItem.classification)}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{currentItem.classification}</span>
              <span className="text-xs opacity-70">
                {new Date(currentItem.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">
              <StreamingText text={currentItem.reasoning} onComplete={handleStreamComplete} />
            </p>
          </motion.div>
        )}

        {!isStreaming && displayedAnalysis.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-gray-400"
          >
            <svg className="w-12 h-12 mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-center">AI is analyzing your deployment logs...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};