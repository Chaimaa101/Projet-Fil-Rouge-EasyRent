import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { VehiculeContext } from "../../Context/VehiculeProvider";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

function Vehicules() {
  const { vehicules, getVehicules, loading } = useContext(VehiculeContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getVehicules();
  }, []);

  const filteredVehicules = vehicules.filter((v) =>
    v.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 relative overflow-auto z-10  min-h-screen py-8">
      <main className="container max-w-7xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          {/* Search & New Vehicule */}
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
                placeholder="Search vehicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch size={25} className="text-gray-500" />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 w-full sm:w-auto"
            >
              NEW Vehicule
            </motion.button>
          </motion.div>

          {/* Loading */}
          {loading && <LoadingSpinner />}

          {/* Vehicule Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-500 text-white uppercase text-sm rounded-lg">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Immatriculation</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicules.map((vehicule, index) => (
                  <motion.tr
                    key={vehicule.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <td className="px-6 py-4">{vehicule.nom}</td>
                    <td className="px-6 py-4">{vehicule.marque.nom}</td>
                    <td className="px-6 py-4">{vehicule.immatriculation}</td>
                    <td className="px-6 py-4">{vehicule.color}</td>
                    <td className="px-6 py-4">{vehicule.prix_day} DH</td>
                    <td className="px-6 py-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <TbEdit size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BiTrash size={20} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
        
      </main>
    </div>
  );
}

export default Vehicules;
