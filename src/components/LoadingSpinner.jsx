import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[200]">
      <div className="text-center">
        <motion.div 
          className="flex gap-4 mb-6 justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-4 h-4 rounded-full bg-pink-200"></div>
          <div className="w-4 h-4 rounded-full bg-blue-200"></div>
        </motion.div>
        
        <h2 className="font-[var(--font-display)] text-2xl font-bold tracking-widest text-gray-800 mb-2 uppercase">
          Preparing Blessings
        </h2>
        <p className="text-gray-400 text-sm font-medium animate-pulse">
          Setting the stage for our twins...
        </p>
      </div>
    </div>
  );
}
