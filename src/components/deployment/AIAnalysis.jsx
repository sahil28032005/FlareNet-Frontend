import { motion } from "framer-motion";
import { StreamingText } from "../chatAssistance/StreamingText";

export const AIAnalysis = ({ logs }) => {
  return (
    <div className="rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute inset-0 backdrop-blur-sm rounded-full" />
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI Analysis
          </h3>
          <p className="text-sm text-blue-300/60">Real-time deployment insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-blue-500/10">
          <h4 className="text-sm font-medium text-blue-300/80 mb-2">Performance Metrics</h4>
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-2"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1 }}
          />
          <p className="text-xs text-blue-300/60">Build optimization: 80%</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-blue-500/10">
          <h4 className="text-sm font-medium text-blue-300/80 mb-2">Security Check</h4>
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-2"
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ duration: 1 }}
          />
          <p className="text-xs text-blue-300/60">Vulnerability scan: 95% safe</p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/50 border border-blue-500/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-blue-300/80">AI Insights</h4>
          <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
            Live Analysis
          </span>
        </div>
        <div className="space-y-3">
          <StreamingText text="Analyzing deployment patterns and optimizing resource allocation..." />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <StreamingText text="Build process completed successfully. No critical issues detected." />
        </div>
      </div>
    </div>
  );
};