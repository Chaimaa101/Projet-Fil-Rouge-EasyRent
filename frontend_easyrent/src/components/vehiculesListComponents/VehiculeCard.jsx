import { FaCogs, FaSnowflake, FaGasPump } from "react-icons/fa";
import { motion } from "framer-motion";

export default function VehiculeCard() {
   
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden p-6"
    >
      
      {/* Image */}
      <div
        className="bg-gray-100 rounded-xl h-40 flex items-center justify-center"
      >
        <img
          src="/car-placeholder.png"
          alt="Mercedes"
          className="opacity-60"
        />
      </div>

      {/* Title & Price */}
      <div className="flex justify-between items-start mt-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Mercedes</h2>
          <p className="text-gray-500 text-sm">Sedan</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-blue-600">$25</p>
          <p className="text-gray-500 text-sm">per day</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex justify-between text-gray-600 text-sm mt-6">
        <div className="flex items-center gap-2">
          <FaCogs /> <span>Automatic</span>
        </div>

        <div className="flex items-center gap-2">
          <FaGasPump /> <span>PB 95</span>
        </div>

        <div className="flex items-center gap-2">
          <FaSnowflake /> <span>AC</span>
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full py-3 rounded-xl text-white font-semibold
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:from-blue-600 hover:to-blue-800
        transition-all duration-300 shadow-md"
      >
        View Details
      </motion.button>
    </motion.div>
  );
}
