import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section 
      className="relative flex flex-col items-center pt-16 pb-12 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Baby Icons */}
      <div className="flex gap-6 mb-8 relative">
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 premium-card flex items-center justify-center text-4xl shadow-lg border-pink-100"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          👧🏻
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse">✨</div>
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 premium-card flex items-center justify-center text-4xl shadow-lg border-blue-100"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          👦🏻
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-[var(--font-script)] text-3xl md:text-4xl text-rose-soft mb-2">
          Double the Blessings, Double the Joy
        </h2>
        <h1 className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Naming <span className="heading-gradient">Ceremony</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-pink-200"></span>
          <p className="font-medium text-gray-400 uppercase tracking-[0.2em] text-xs">
            Join Us in Celebrating Our Twins
          </p>
          <span className="h-px w-12 bg-blue-200"></span>
        </div>
      </motion.div>

      {/* Emotional Quote */}
      <motion.p 
        className="max-w-lg text-gray-500 italic text-lg font-light leading-relaxed mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        &ldquo;Two little lives to name and love, 
        Two precious gifts from heaven above.&rdquo;
      </motion.p>
    </motion.section>
  );
}
