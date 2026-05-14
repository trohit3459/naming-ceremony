import { motion } from "framer-motion";
import { UPCOMING_EVENTS } from "../constants";

export default function UpcomingEventsSection() {
  if (!UPCOMING_EVENTS || UPCOMING_EVENTS.length === 0) return null;

  return (
    <motion.section 
      className="w-full max-w-3xl mx-auto px-4 md:px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
          <span className="heading-gradient">Upcoming Celebrations</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The journey has just begun! Join us for these upcoming milestones.
        </p>
      </div>

      <div className="space-y-6">
        {UPCOMING_EVENTS.map((event, index) => (
          <motion.div 
            key={event.id}
            className="premium-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold-light/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-gold-light/20 to-gold/20 border border-gold-light/30 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{event.date.split(" ")[0]}</span>
              <span className="text-2xl font-[var(--font-display)] font-bold text-gray-800">{event.date.split(" ")[1]}</span>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
            
            <div className="flex-shrink-0">
              <button className="text-gold font-medium hover:text-gold-dark transition-colors inline-flex items-center gap-1 group">
                Save the Date
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
