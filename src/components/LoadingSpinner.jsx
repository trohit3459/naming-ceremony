import { motion } from "framer-motion";

/**
 * Full-page loading spinner shown while Firebase initializes.
 */
export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          👶🏻
        </motion.div>
        <p className="text-gray-500 font-medium">Loading the celebration...</p>
      </motion.div>
    </div>
  );
}
