import { motion } from "framer-motion";

/**
 * Individual name card for the poll selection.
 * @param {{ name: string, emoji: string, selected: boolean, onClick: () => void, type: "boy" | "girl", voteCount: number, totalVotes: number, showResults: boolean }} props
 */
export default function NameCard({
  name,
  emoji,
  selected,
  onClick,
  type,
  voteCount = 0,
  totalVotes = 0,
  showResults = false,
}) {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
  const isGirl = type === "girl";

  return (
    <motion.button
      onClick={onClick}
      className={`
        name-card w-full p-4 rounded-2xl border-2 text-left
        ${selected
          ? isGirl
            ? "selected-girl border-pink-400"
            : "selected-boy border-blue-400"
          : "bg-white/60 border-white/80 hover:border-gray-200"
        }
      `}
      whileHover={{ scale: showResults ? 1 : 1.02 }}
      whileTap={{ scale: showResults ? 1 : 0.98 }}
      disabled={showResults}
      layout
      id={`name-card-${name.toLowerCase()}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <span className={`font-semibold text-lg ${
            selected
              ? isGirl ? "text-pink-700" : "text-blue-700"
              : "text-gray-700"
          }`}>
            {name}
          </span>
        </div>
        {selected && !showResults && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-sm font-bold px-3 py-1 rounded-full ${
              isGirl ? "bg-pink-200 text-pink-700" : "bg-blue-200 text-blue-700"
            }`}
          >
            ✓ Selected
          </motion.span>
        )}
        {showResults && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold text-gray-600"
          >
            {voteCount} vote{voteCount !== 1 ? "s" : ""} ({percentage}%)
          </motion.span>
        )}
      </div>

      {/* Vote progress bar (shown after voting) */}
      {showResults && (
        <motion.div
          className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className={`vote-bar h-full ${
              isGirl
                ? "bg-gradient-to-r from-pink-400 to-pink-500"
                : "bg-gradient-to-r from-blue-400 to-blue-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      )}
    </motion.button>
  );
}
