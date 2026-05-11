import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer 
      className="w-full max-w-xl mx-auto px-6 py-20 text-center border-t border-pink-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mb-8">
        <h3 className="font-[var(--font-script)] text-4xl text-rose mb-4 animate-pulse">
          With Love
        </h3>
        <p className="text-gray-400 font-medium tracking-widest text-xs uppercase">
          The Proud Parents
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <span className="w-2 h-2 rounded-full bg-pink-100"></span>
        <span className="w-2 h-2 rounded-full bg-blue-100"></span>
        <span className="w-2 h-2 rounded-full bg-pink-100"></span>
      </div>

      <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
        We are so grateful for your presence in our lives. Thank you for being part of this special milestone.
      </p>

      <div className="mt-12 text-[10px] text-gray-300 font-bold tracking-[0.3em] uppercase">
        © 2026 • Twin Naming Ceremony
      </div>
    </motion.footer>
  );
}
