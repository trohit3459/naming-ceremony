import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./components/HeroSection";
import EventDetails from "./components/EventDetails";
import ResultsSection from "./components/ResultsSection";
import MediaSection from "./components/MediaSection";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import Footer from "./components/Footer";
import FloatingParticles from "./components/FloatingParticles";
import Confetti from "./components/Confetti";

export default function App() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Show confetti on first load to celebrate the results
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex justify-center bg-white selection:bg-pink-100">
      {/* Background Ambience */}
      <FloatingParticles />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center overflow-x-hidden md:overflow-x-visible">
        {/* Entry Animation Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center pb-20"
        >
          <HeroSection />
          
          <hr className="w-32 h-[2px] bg-gradient-to-r from-transparent via-pink-100 to-transparent mx-auto border-none my-8" />
          
          <div className="w-full my-8">
            <ResultsSection />
          </div>

          <div className="w-full my-8">
            <MediaSection />
          </div>
          
          <div className="w-full my-8 max-w-3xl mx-auto">
            <EventDetails />
          </div>
          
          <div className="w-full my-8 max-w-3xl mx-auto">
            <UpcomingEventsSection />
          </div>
          
          <div className="w-full mt-12 max-w-3xl mx-auto">
            <Footer />
          </div>
        </motion.div>
      </main>

      {/* Confetti Overlay */}
      {showConfetti && <Confetti duration={8000} />}
    </div>
  );
}

