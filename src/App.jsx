import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVotes } from "./hooks/useVotes";
import HeroSection from "./components/HeroSection";
import CountdownTimer from "./components/CountdownTimer";
import EventDetails from "./components/EventDetails";
import PollSection from "./components/PollSection";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import FloatingParticles from "./components/FloatingParticles";
import Confetti from "./components/Confetti";

export default function App() {
  const { votes, loading, submitting, hasVoted, error, submitVote } = useVotes();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (hasVoted && !loading) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [hasVoted, loading]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-[100dvh] w-full flex justify-center bg-white selection:bg-pink-100">
      {/* Background Ambience */}
      <FloatingParticles />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Entry Animation Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <HeroSection />
          
          <div className="w-full space-y-16 pb-20">
            <CountdownTimer />
            
            <hr className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-100 to-transparent mx-auto border-none" />
            
            <EventDetails />
            
            <div className="relative">
              {/* Subtle Watermark Decoration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
                <span className="text-[25vw] font-black tracking-tighter uppercase leading-none transform -rotate-12">
                  Twins
                </span>
              </div>

              <PollSection
                votes={votes}
                hasVoted={hasVoted}
                submitting={submitting}
                error={error}
                onSubmit={submitVote}
              />
            </div>
            
            <Footer />
          </div>
        </motion.div>
      </main>

      {/* Confetti Overlay */}
      {showConfetti && <Confetti duration={8000} />}
    </div>
  );
}

