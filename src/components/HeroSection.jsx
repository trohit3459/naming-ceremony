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
      <div className="flex justify-center items-center mb-10 relative h-28">
        <motion.div 
          className="absolute z-10 w-24 h-24 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-pink-100/50"
          style={{ x: -20 }}
          animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          👧🏻
        </motion.div>
        
        <div className="absolute z-30 text-2xl animate-pulse text-gold">✨</div>
        
        <motion.div 
          className="absolute z-20 w-24 h-24 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-blue-100/50"
          style={{ x: 20 }}
          animate={{ y: [0, 5, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
