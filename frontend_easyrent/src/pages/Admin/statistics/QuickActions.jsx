import { motion } from "framer-motion";
import { FaPlusCircle, FaCalendarAlt, FaChartBar, FaCog } from "react-icons/fa";

export default function QuickActions() {
  return (
    <motion.div
      className="w-full h-1/2 bg-gray-50 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Actions rapides</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a
          href="/admin/addVehicule"
          className="flex flex-col items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
        >
          <FaPlusCircle className="text-2xl text-teal-500 mb-2" />
          <span className="text-sm text-center">Nouvelle Vehicule</span>
        </a>

        <a
          href="/admin/reservations"
          className="flex flex-col items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
        >
          <FaCalendarAlt className="text-2xl text-teal-500 mb-2" />
          <span className="text-sm text-center">Réservations</span>
        </a>

        <a
          href="/admin/dashboard"
          className="flex flex-col items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
        >
          <FaChartBar className="text-2xl text-teal-500 mb-2" />
          <span className="text-sm text-center">Statistiques</span>
        </a>

        <a
          href="/profile"
          className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-teal-100 transition"
        >
          <FaCog className="text-2xl text-teal-500 mb-2" />
          <span className="text-sm text-center">Paramètres</span>
        </a>
      </div>
    </motion.div>
  );
}
