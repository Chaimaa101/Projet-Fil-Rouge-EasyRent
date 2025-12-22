
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

function StatCard({ name, icon: Icon, number }) {
  return (
    <motion.div
      className="flex flex-col overflow-hidden shadow-sm rounded-xl border border-gray-100 bg-white px-5 py-4 sm:p-6 hover:border-gray-200 transition-all duration-300 relative group"
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 20px -10px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-all duration-300">
          <Icon size={28} className="text-gray-700" />
        </div>
        <p className="text-lg font-semibold text-gray-800">{name}</p>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900 self-end">
        {number}
      </p>

      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export default StatCard;