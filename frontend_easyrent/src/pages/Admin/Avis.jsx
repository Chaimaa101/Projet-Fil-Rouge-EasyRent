import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { MdOutlineEmail, MdOutlinePhone, MdSearch } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "./common/PageHeader";
import { AdminContext } from "../../Context/AdminProvider";
import { AvisContext } from "../../Context/AvisProvider";

export default function Avis() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    avis = [],
    getAvis,
    toggleAvisIsPublic,
    loading,
  } = useContext(AdminContext);
  const { deleteAvis } = useContext(AvisContext);

 
  useEffect(() => {
    getAvis();
  }, []);

   const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette marque ?")) {
      deleteAvis(id);
    }
  };

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
     <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen p-12">
         <PageHeader
      title="Gestion des Avis"
      subtitle="Consultez, suprimmez et gérez l'ensemble des commentaires "
            num={avis.length}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"
          >
            <div className="flex items-center w-full sm:w-1/2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
              <input
            type="text"
            className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
            placeholder="Rechercher un Commentaire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdSearch size={25} className="text-gray-500" />
        </div>
      </motion.div>
        {loading && <GlobalLoader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
        <AnimatePresence>
          {filteredMessages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -50 }}
              whileHover={{ scale: 1.02 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-blue-50 p-6 rounded-2xl shadow-2xl"
            >
          
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {msg.avis}
                </h3>
              </div>

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

              <p className="mt-2 text-xs text-gray-500">Rating: {msg.rating}</p>

              <div className="mt-5 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleAvisIsPublic(msg.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all
    ${
      msg.isPublic
        ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }
  `}
                >
                  {msg.isPublic ? "Actif" : "Désactivé"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(msg.id)}
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
