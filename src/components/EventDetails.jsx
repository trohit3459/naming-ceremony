import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiNavigation } from "react-icons/fi";
import { EVENT_DETAILS } from "../constants";

export default function EventDetails() {
  return (
    <motion.section 
      className="w-full max-w-xl mx-auto px-6 py-8"
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="premium-card p-10 relative overflow-hidden group">
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-50 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-transparent opacity-50"></div>

        <h3 className="font-[var(--font-display)] text-3xl font-bold text-center mb-10 text-gray-800">
          Invitation Details
        </h3>

        <div className="space-y-8 relative z-10">
          {/* Date */}
          <div className="flex items-start gap-6 group/item">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-sm">
              <FiCalendar size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-1">Date</p>
              <p className="text-xl font-bold text-gray-700">{EVENT_DETAILS.date}</p>
              <p className="text-gray-500">{EVENT_DETAILS.day}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-6 group/item">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-sm">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-1">Time</p>
              <p className="text-xl font-bold text-gray-700">{EVENT_DETAILS.time}</p>
              <p className="text-gray-500">Evening Reception</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-6 group/item">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform shadow-sm">
              <FiMapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-1">Venue</p>
              <p className="text-xl font-bold text-gray-700">{EVENT_DETAILS.venue}</p>
              <p className="text-gray-500 leading-snug">{EVENT_DETAILS.address}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <motion.a
            href={EVENT_DETAILS.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold shadow-xl hover:bg-black transition-all hover:shadow-2xl active:scale-95"
            whileHover={{ y: -2 }}
          >
            <FiNavigation size={18} />
            Navigate to Venue
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
