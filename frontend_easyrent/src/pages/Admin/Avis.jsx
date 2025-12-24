import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { AvisContext } from "../../Context/AvisProvider";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../../components/PageHeader";

export default function Avis() {
  const [searchQuery, setSearchQuery] = useState("");
  const { avis, getAvis, loading } = useContext(AvisContext);

  const handleSpam = (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      router.delete(`/messages/${id}`, {
        preserveScroll: true,
      });
    }
  };
  useEffect(() => {
    getAvis();
  }, []);

  // Search logic
  const filteredMessages = avis.filter((msg) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      msg.user.nom.toLowerCase().includes(searchLower) ||
      msg.user.email.toLowerCase().includes(searchLower) ||
      msg.avis.toLowerCase().includes(searchLower) ||
      msg.user.prenom.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex-1 relative overflow-auto z-5 bg-gray-100 text-black">
            <PageHeader title = "Gestion des avis" subtitle="gesfvnsfjvjksfjk svjsjnvsjkrvsw" num={avis.length} />
      

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
        {loading && <GlobalLoader />}
        <AnimatePresence>
          {filteredMessages.map((msg,index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -50 }}
                whileHover={{ scale: 1.02 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-blue-50 p-6 rounded-2xl shadow-2xl"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {msg.avis}
                </h3>
              </div>

              {/* Contact Info */}
              <div className="mt-3 text-gray-600 text-sm flex flex-wrap gap-3">
                <span className="flex items-center gap-2">
                  <MdOutlineEmail size={18} className="text-gray-500" />
                  {msg.user.email}
                </span>
                <span className="flex items-center gap-2">
                  <MdOutlinePhone size={18} className="text-gray-500" />
                  {msg.user.nom} {msg.user.prenom}
                </span>
              </div>

              {/* Timestamp */}
              <p className="mt-2 text-xs text-gray-500">
                Received: {msg.rating}
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleArchive(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  Ratter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSpam(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <GoTrash size={16} />
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
