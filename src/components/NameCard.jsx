import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NameCard = memo(function NameCard({
  name,
  emoji,
  selected,
  isDimmed,
  onClick,
  type,
  voteCount = 0,
  totalVotes = 0,
  showResults = false,
}) {
  const isGirl = type === "girl";
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  return (
    <motion.button
      onClick={onClick}
      disabled={showResults}
      className={`
        relative w-full text-left p-6 rounded-[24px] transition-all duration-300
        ${showResults 
          ? "bg-white/40 cursor-default" 
          : selected
            ? isGirl ? "bg-pink-50 ring-2 ring-pink-400" : "bg-blue-50 ring-2 ring-blue-400"
            : isDimmed 
              ? "bg-white/40 opacity-60 hover:opacity-100 grayscale-[0.2]" 
              : "bg-white/80 hover:bg-white hover:shadow-lg"
        }
        shadow-sm border border-white/50
      `}
      whileHover={showResults ? {} : { y: -4, scale: 1.02 }}
      whileTap={showResults ? {} : { scale: 0.98 }}
      layout
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
            ${isGirl ? "bg-pink-100" : "bg-blue-100"}
          `}>
            {emoji}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-lg leading-tight">{name}</h4>
            {showResults && (
              <p className="text-sm font-medium text-gray-500 mt-1">
                {voteCount} votes • {percentage}%
              </p>
            )}
          </div>
        </div>

        {/* Selection Marker */}
        {!showResults && selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${isGirl ? "bg-pink-500" : "bg-blue-500"}`}
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Progress Bar for Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4"
          >
            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`progress-bar-fill h-full ${isGirl ? "bg-gradient-to-r from-pink-300 to-rose" : "bg-gradient-to-r from-blue-300 to-sky"}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

export default NameCard;
