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
            className="text-center mt-12 p-10 premium-card border-gold-light/20 bg-gradient-to-b from-white to-gray-50/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 mb-6 p-4 bg-red-50 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>⚠️</span> {error}
              </motion.div>
            )}
            
            <p className="text-[10px] text-gray-400 mb-8 font-bold uppercase tracking-[0.3em]">
              Final Step
            </p>

            <div className="flex flex-col items-center gap-4">
              <button
                className="btn-primary w-full max-w-sm flex items-center justify-center gap-3 active:scale-95 disabled:grayscale"
                onClick={() => onSubmit(selectedBoy, selectedGirl)}
                disabled={!canSubmit}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Recording Blessings...
                  </>
                ) : (
                  "Cast Your Vote 🗳️"
                )}
              </button>
              
              {!selectedGirl || !selectedBoy ? (
                <p className="text-[11px] text-gray-400 font-medium animate-pulse">
                  * Please select one name for both the girl and boy
                </p>
              ) : null}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mt-8 p-12 premium-card bg-green-50/40 border-green-200/50"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              ✨
            </div>
            <h3 className="text-3xl font-bold text-green-800 mb-3 font-[var(--font-display)]">
              Blessings Received
            </h3>
            <p className="text-green-600 font-medium max-w-xs mx-auto">
              Your choices have been recorded. Thank you for being part of our story.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
