import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * Optimized Confetti Component.
 * Runs once and clears itself to save GPU resources.
 */
export default function Confetti({ duration = 5000 }) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const pieces = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: ["#FFB6C1", "#B0C4DE", "#FFD700", "#F08080", "#87CEFA"][i % 5],
      size: 5 + Math.random() * 8,
      rotate: Math.random() * 360,
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, rotate: 0, opacity: 1 }}
          animate={{ 
            y: "110vh", 
            rotate: p.rotate + 720,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
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
