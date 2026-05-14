import { motion } from "framer-motion";
import { MEDIA } from "../constants";

export default function MediaSection() {
  return (
    <motion.section 
      className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
          <span className="heading-gradient">Event Highlights</span>
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Relive the beautiful moments from the naming ceremony.
        </p>
      </div>

      {/* YouTube Live Link */}
      <div className="mb-16">
        <div className="premium-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-red-50 to-white border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 flex-shrink-0">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Watch the Ceremony</h3>
            <p className="text-gray-600 mb-4">Missed the event or want to watch it again? Catch the full recording here.</p>
          </div>
          <div>
            <a 
              href={MEDIA.youtubeLiveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary bg-red-500 hover:bg-red-600 shadow-red-200/50 inline-flex items-center gap-2"
            >
              Watch Video
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footage Gallery */}
      <div>
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 font-[var(--font-display)]">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MEDIA.footages.map((item, index) => (
            <motion.div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-md border border-gray-100 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={item.url} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium text-sm">{item.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
