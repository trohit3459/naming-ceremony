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

export default function App() {
  const { votes, loading, submitting, hasVoted, error, submitVote } = useVotes();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (hasVoted && !loading) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [hasVoted, loading]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen w-full flex justify-center">
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
          
          <div className="w-full space-y-12 pb-20">
            <CountdownTimer />
            
            <hr className="w-24 h-px bg-pink-100 mx-auto border-none" />
            
            <EventDetails />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <div className="text-[20rem] font-bold select-none">TWINS</div>
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
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[100]"
          >
            <ConfettiCelebration />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfettiCelebration() {
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    color: ["#FFB6C1", "#B0C4DE", "#FFD700", "#F08080", "#87CEFA"][i % 5],
    size: 5 + Math.random() * 10,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="relative w-full h-full">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ 
            y: "110vh", 
            rotate: p.rotate + 720,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            position: "absolute",
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
