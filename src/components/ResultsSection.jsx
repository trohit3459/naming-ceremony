import { motion } from "framer-motion";
import { RESULTS } from "../constants";

export default function ResultsSection() {
  return (
    <motion.section 
      className="w-full max-w-2xl mx-auto px-4 md:px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold mb-4">
          <span className="heading-gradient">Names Revealed!</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Thank you to everyone who joined us in welcoming and naming our beautiful twins. Here are the names we have chosen:
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Baby Girl Result */}
        <motion.div 
          className="w-full md:w-1/2 premium-card p-8 border-pink-200 bg-gradient-to-b from-pink-50/50 to-white flex flex-col items-center justify-center relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full opacity-50 pointer-events-none"></div>
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm z-10">
            👧🏻
          </div>
          <p className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-2 z-10">For Our Baby Girl</p>
          <h3 className="text-4xl font-[var(--font-display)] font-bold text-gray-800 z-10 mb-2">
            {RESULTS.girl.name}
          </h3>
          <span className="text-4xl z-10">{RESULTS.girl.emoji}</span>
        </motion.div>

        {/* Baby Boy Result */}
        <motion.div 
          className="w-full md:w-1/2 premium-card p-8 border-blue-200 bg-gradient-to-b from-blue-50/50 to-white flex flex-col items-center justify-center relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-br-full opacity-50 pointer-events-none"></div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm z-10">
            👦🏻
          </div>
          <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2 z-10">For Our Baby Boy</p>
          <h3 className="text-4xl font-[var(--font-display)] font-bold text-gray-800 z-10 mb-2">
            {RESULTS.boy.name}
          </h3>
          <span className="text-4xl z-10">{RESULTS.boy.emoji}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
