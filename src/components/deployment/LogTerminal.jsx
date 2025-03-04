import { motion } from "framer-motion";

export const LogTerminal = ({ logs }) => {
  return (
    <div className="rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Deployment Logs
        </h3>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>
      
      <div className="terminal-window h-[400px] overflow-y-auto rounded-xl bg-slate-900/50 p-4 font-mono">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`py-2 px-4 rounded-lg mb-2 text-sm ${
              index % 2 === 0
                ? 'bg-blue-500/10 text-blue-200'
                : 'bg-purple-500/10 text-purple-200'
            }`}
          >
            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
};