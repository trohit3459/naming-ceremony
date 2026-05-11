import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Countdown timer to the ceremony date.
 */
export default function CountdownTimer() {
  const targetDate = new Date("2026-05-13T19:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return (
      <motion.div
        className="text-center py-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <p className="text-2xl md:text-3xl font-[var(--font-script)] gradient-text font-bold">
          🎉 The Celebration Has Begun! 🎉
        </p>
      </motion.div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="py-6 px-4"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-medium">
          Ceremony begins in
        </p>
        <div className="flex justify-center gap-3 md:gap-4">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              className="glass-card px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[80px]"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                key={unit.value}
                className="block text-2xl md:text-3xl font-bold gradient-text"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
