import { useMemo } from "react";

const PARTICLES = ["✨", "🌸", "⭐", "💫", "🎀", "🌟", "💕", "🎉", "🎊"];

/**
 * Floating decorative background particles that animate across the viewport.
 */
export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: PARTICLES[i % PARTICLES.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: `${1 + Math.random() * 1.5}rem`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-element"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.3,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
