import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameCard from "./NameCard";
import { GIRL_NAMES, BOY_NAMES } from "../constants";

export default function PollSection({ votes, hasVoted, submitting, error, onSubmit }) {
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [selectedBoy, setSelectedBoy] = useState(null);

  const canSubmit = selectedGirl && selectedBoy && !submitting && !hasVoted;

  const totalGirlVotes = Object.values(votes.girl || {}).reduce((s, v) => s + v, 0);
  const totalBoyVotes = Object.values(votes.boy || {}).reduce((s, v) => s + v, 0);

  return (
    <motion.section 
      className="w-full max-w-2xl mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold mb-4">
          The <span className="heading-gradient">Great Name Vote</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We can&apos;t decide on the perfect names! Choose one for each baby to help us make the final decision.
        </p>
      </div>

      {/* Girl Names Grid */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">👧🏻</div>
          <h3 className="text-2xl font-bold text-gray-800">For Our Baby Girl</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GIRL_NAMES.map((item) => (
            <NameCard
              key={item.id}
              {...item}
              type="girl"
              selected={selectedGirl === item.id}
              onClick={() => !hasVoted && setSelectedGirl(item.id)}
              voteCount={votes.girl?.[item.id] || 0}
              totalVotes={totalGirlVotes}
              showResults={hasVoted}
            />
          ))}
        </div>
      </div>

      {/* Boy Names Grid */}
      <div className="mb-14">
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">👦🏻</div>
          <h3 className="text-2xl font-bold text-gray-800">For Our Baby Boy</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOY_NAMES.map((item) => (
            <NameCard
              key={item.id}
              {...item}
              type="boy"
              selected={selectedBoy === item.id}
              onClick={() => !hasVoted && setSelectedBoy(item.id)}
              voteCount={votes.boy?.[item.id] || 0}
              totalVotes={totalBoyVotes}
              showResults={hasVoted}
            />
          ))}
        </div>
      </div>

      {/* Submit Section */}
      <AnimatePresence>
        {!hasVoted ? (
          <motion.div 
            className="text-center mt-12 p-8 premium-card border-gold-light/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {error && <p className="text-red-500 mb-4 text-sm font-medium">⚠️ {error}</p>}
            <p className="text-sm text-gray-400 mb-6 font-medium uppercase tracking-widest">
              Final Choice
            </p>
            <button
              className="btn-primary w-full max-w-sm disabled:opacity-50 disabled:grayscale transition-all"
              onClick={() => onSubmit(selectedBoy, selectedGirl)}
              disabled={!canSubmit}
            >
              {submitting ? "Casting Your Vote..." : "Submit My Choices 🗳️"}
            </button>
            {!canSubmit && (
              <p className="text-xs text-gray-400 mt-4 italic">
                Please pick one name for the girl and one for the boy to submit
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mt-8 p-10 premium-card bg-green-50/50 border-green-200"
          >
            <div className="text-5xl mb-4">✨✅✨</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Thank You for Voting!</h3>
            <p className="text-green-600 font-medium">Your love and input mean the world to us.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
