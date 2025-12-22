import { motion, AnimatePresence } from "framer-motion"; 
import { useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { BrandContext } from "../../Context/BrandProvider";
import PageHeader from "../../components/PageHeader";

export default function Brands() {

  const Brands= [message => "hello"]
  const [searchQuery, setSearchQuery] = useState("");

  const handleArchive = (id) => {

  };

  const handleSpam = (id) => {
  
  };

  return (
    <div className="flex-1 relative overflow-auto z-5 text-white">
      <PageHeader title="Gestion des marques" subtitle="gestionnnnn"/>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mt-4 mb-4 p-6"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search messages by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
            aria-label="Search messages"
          />
          <HiOutlineSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </motion.div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
        <AnimatePresence>
          {Brands.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-6 border rounded-xl shadow-sm transition-all hover:shadow-md ${msg.priority === "High"
                  ? "bg-red-50 border-red-200"
                  : msg.priority === "Medium"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
                }`}
            >
              {/* Header Section */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {msg.title}
                </h3>
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${msg.priority === "High"
                      ? "bg-red-500 text-white"
                      : msg.priority === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                >
                  <FaExclamationCircle size={12} />
                  {msg.priority}
                </span>
              </div>

              {/* Contact Info */}
              <div className="mt-3 text-gray-600 text-sm flex flex-wrap gap-3">
                <span className="flex items-center gap-2">
                  <MdOutlineEmail size={18} className="text-gray-500" />
                  {msg.email}
                </span>
                <span className="flex items-center gap-2">
                  <MdOutlinePhone size={18} className="text-gray-500" />
                  {msg.phone}
                </span>
              </div>

              {/* Timestamp */}
              <p className="mt-2 text-xs text-gray-500">
                Received: {msg.timestamp}
              </p>

              {/* Subject & Message */}
              <p className="mt-4 text-gray-800 font-medium">{msg.subject}</p>
              <p className="mt-2 text-gray-600">{msg.message}</p>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleArchive(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  Archive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSpam(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <GoTrash size={16} />
                  Spam
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

