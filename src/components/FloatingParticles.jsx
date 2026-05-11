import { useMemo } from "react";
import { motion } from "framer-motion";

const SYMBOLS = ["✨", "☁️", "🤍", "⭐"];

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 10 + Math.random() * 15,
      opacity: 0.1 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-gray-400"
          initial={{ y: "110vh", x: p.left }}
          animate={{ 
            y: "-10vh",
            x: [p.left, `${parseFloat(p.left) + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            fontSize: p.size,
            opacity: p.opacity,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
