import { motion } from "framer-motion";

/**
 * Hero section displaying the ceremony header and decorative elements.
 */
export default function HeroSection() {
  return (
    <motion.section
      className="relative text-center py-12 px-4 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative top flourish */}
      <motion.div
        className="text-4xl md:text-5xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
      >
        👶🏻✨👶🏻
      </motion.div>

      {/* Main heading */}
      <motion.h1
        className="font-[var(--font-script)] text-5xl md:text-7xl lg:text-8xl gradient-text font-bold leading-tight"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Naming Ceremony
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-[var(--font-display)] text-xl md:text-2xl text-gray-600 mt-4 italic"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Celebrating Our Twin Blessings
      </motion.p>

      {/* Ornamental divider */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent to-pink-300"></span>
        <span className="text-2xl">🎀</span>
        <span className="h-[1px] w-16 md:w-24 bg-gradient-to-l from-transparent to-blue-300"></span>
      </motion.div>

      {/* Welcoming message */}
      <motion.p
        className="mt-6 text-base md:text-lg text-gray-500 max-w-md mx-auto font-light leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        With joy in our hearts, we invite you to bless &amp; name our little angels
      </motion.p>
    </motion.section>
  );
}
