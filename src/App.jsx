import { useState, useEffect } from "react";
import { useVotes } from "./hooks/useVotes";
import FloatingParticles from "./components/FloatingParticles";
import HeroSection from "./components/HeroSection";
import CountdownTimer from "./components/CountdownTimer";
import EventDetails from "./components/EventDetails";
import PollSection from "./components/PollSection";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

/**
 * Main Application Component.
 * Assembles all sections of the naming ceremony invitation.
 */
export default function App() {
  const { votes, loading, submitting, hasVoted, error, submitVote } = useVotes();
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti briefly after successful vote
  useEffect(() => {
    if (hasVoted && !loading) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasVoted, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Background floating particles */}
      <FloatingParticles />

      {/* Main content */}
      <main className="relative z-10 w-full max-w-2xl px-6 py-12 flex flex-col items-center">
        {/* Hero / Invitation Header */}
        <div className="w-full">
          <HeroSection />
        </div>

        {/* Countdown Timer */}
        <div className="w-full">
          <CountdownTimer />
        </div>

        {/* Divider */}
        <hr className="section-divider w-32 mx-auto" />

        {/* Event Details */}
        <div className="w-full">
          <EventDetails />
        </div>

        {/* Divider */}
        <hr className="section-divider w-full max-w-xs mx-auto opacity-50" />

        {/* Name Voting Poll */}
        <div className="w-full">
          <PollSection
            votes={votes}
            hasVoted={hasVoted}
            submitting={submitting}
            error={error}
            onSubmit={submitVote}
          />
        </div>

        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </main>

      {/* Confetti overlay on successful vote */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ConfettiRain />
        </div>
      )}
    </div>
  );
}

/**
 * Simple CSS-based confetti rain effect.
 */
function ConfettiRain() {
  const colors = ["#e91e63", "#2196f3", "#ff9800", "#4caf50", "#9c27b0", "#ffd54f"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 3}s`,
    color: colors[i % colors.length],
    size: `${6 + Math.random() * 8}px`,
  }));

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "fixed",
            left: piece.left,
            top: 0,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti-fall ${piece.duration} ${piece.delay} ease-in forwards`,
          }}
        />
      ))}
    </>
  );
}
