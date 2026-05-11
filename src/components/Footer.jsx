import { motion } from "framer-motion";

/**
 * Footer section with a warm closing message.
 */
export default function Footer() {
  return (
    <motion.footer
      className="text-center py-10 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-md mx-auto">
        <p className="font-[var(--font-script)] text-2xl md:text-3xl text-gray-600 mb-3">
          With Love &amp; Blessings
        </p>
        <p className="text-gray-400 text-sm">
          We can&apos;t wait to celebrate this special day with you! 💕
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-200"></span>
          <span className="text-lg">👨‍👩‍👧‍👦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-200"></span>
        </div>
        <p className="text-xs text-gray-300 mt-6">
          Made with ❤️ for our little angels
        </p>
      </div>
    </motion.footer>
  );
}
