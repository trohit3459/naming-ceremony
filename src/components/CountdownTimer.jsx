import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CountdownTimer() {
  const targetDate = new Date("2026-05-13T19:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-8">
      <div className="premium-card p-8 bg-gradient-to-b from-white/80 to-blue-50/30">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gray-400 mb-8">
          Counting Down To The Magic
        </p>
        <div className="flex justify-between items-center px-2 md:px-8">
          {units.map((unit, idx) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div 
                key={unit.value}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-[var(--font-display)] font-bold text-gray-800"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-400 mt-2">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
