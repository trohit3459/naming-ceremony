import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { EVENT_DETAILS } from "../constants";

/**
 * Event details card showing date, time, venue, and Google Maps link.
 */
export default function EventDetails() {
  return (
    <motion.section
      className="px-4 pb-8"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-card max-w-lg mx-auto p-8 md:p-10 text-center" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
        {/* Section Title */}
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          You&apos;re Cordially Invited
        </h2>

        <div className="space-y-5">
          {/* Date */}
          <motion.div
            className="flex items-center justify-center gap-3 text-lg"
            whileHover={{ scale: 1.02 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-500">
              <FiCalendar size={20} />
            </span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{EVENT_DETAILS.date}</p>
              <p className="text-sm text-gray-500">{EVENT_DETAILS.day}</p>
            </div>
          </motion.div>

          {/* Time */}
          <motion.div
            className="flex items-center justify-center gap-3 text-lg"
            whileHover={{ scale: 1.02 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-500">
              <FiClock size={20} />
            </span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{EVENT_DETAILS.time}</p>
              <p className="text-sm text-gray-500">Evening Celebration</p>
            </div>
          </motion.div>

          {/* Venue */}
          <motion.div
            className="flex items-center justify-center gap-3 text-lg"
            whileHover={{ scale: 1.02 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-500">
              <FiMapPin size={20} />
            </span>
            <div className="text-left">
              <p className="font-semibold text-gray-800">{EVENT_DETAILS.venue}</p>
              <p className="text-sm text-gray-500">{EVENT_DETAILS.address}</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="section-divider my-6" />

        {/* Google Maps Button */}
        <motion.a
          href={EVENT_DETAILS.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="google-maps-link"
        >
          <FiMapPin size={18} />
          Open in Google Maps
        </motion.a>
      </div>
    </motion.section>
  );
}
