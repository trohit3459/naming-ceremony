import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameCard from "./NameCard";
import { GIRL_NAMES, BOY_NAMES } from "../constants";

/**
 * Main poll section for voting on baby names.
 * @param {{ votes: object, hasVoted: boolean, submitting: boolean, error: string|null, onSubmit: (boyId: string, girlId: string) => Promise<boolean> }} props
 */
export default function PollSection({
  votes,
  hasVoted,
  submitting,
  error,
  onSubmit,
}) {
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  const canSubmit = selectedGirl && selectedBoy && !submitting && !hasVoted;

  const totalGirlVotes = Object.values(votes.girl || {}).reduce(
    (sum, v) => sum + v,
    0
  );
  const totalBoyVotes = Object.values(votes.boy || {}).reduce(
    (sum, v) => sum + v,
    0
  );

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const success = await onSubmit(selectedBoy, selectedGirl);
    if (success) {
      setVoteSuccess(true);
    }
  };

  return (
    <motion.section
      className="px-4 py-8"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h2
            className="font-[var(--font-display)] text-3xl md:text-5xl font-semibold gradient-text"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Help Us Name Our Twins!
          </motion.h2>
          <p className="text-gray-500 mt-3 text-lg md:text-xl">
            {hasVoted
              ? "🎉 Thank you for voting! Here are the live results:"
              : "Pick one name for each baby and submit your vote"}
          </p>
        </div>

        {/* Girl Names Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">👧🏻</span>
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-pink-600">
              Baby Girl Names
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            {GIRL_NAMES.map((item) => (
              <NameCard
                key={item.id}
                name={item.name}
                emoji={item.emoji}
                type="girl"
                selected={selectedGirl === item.id}
                onClick={() => !hasVoted && setSelectedGirl(item.id)}
                voteCount={votes.girl?.[item.id] || 0}
                totalVotes={totalGirlVotes}
                showResults={hasVoted || voteSuccess}
              />
            ))}
          </div>
        </div>

        {/* Boy Names Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">👦🏻</span>
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-blue-600">
              Baby Boy Names
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            {BOY_NAMES.map((item) => (
              <NameCard
                key={item.id}
                name={item.name}
                emoji={item.emoji}
                type="boy"
                selected={selectedBoy === item.id}
                onClick={() => !hasVoted && setSelectedBoy(item.id)}
                voteCount={votes.boy?.[item.id] || 0}
                totalVotes={totalBoyVotes}
                showResults={hasVoted || voteSuccess}
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="text-center mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        {!hasVoted && !voteSuccess && (
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!canSubmit}
              id="submit-vote-btn"
            >
              {submitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit My Votes 🗳️"
              )}
            </button>
            {(!selectedGirl || !selectedBoy) && (
              <p className="text-xs text-gray-400 mt-3">
                Please select one name for each baby
              </p>
            )}
          </motion.div>
        )}

        {/* Success Message */}
        <AnimatePresence>
          {(hasVoted || voteSuccess) && (
            <motion.div
              className="text-center mt-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="glass-card inline-block px-8 py-4">
                <p className="text-lg font-semibold text-green-600">
                  ✅ Your vote has been recorded!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Results update in real-time
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
