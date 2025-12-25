import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import Pagination from "../../components/Pagination";
import PageHeader from "../../components/PageHeader";
import GlobalLoader from "../../components/common/GlobalLoader";
import { Link } from "react-router-dom";

function Vehicules() {
  const { pagination, vehicules, getVehicules, loading,total } =
    useContext(VehiculeContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getVehicules();
  }, []);

  const filteredVehicules = vehicules.filter((v) =>
    v.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

   const statusConfig = {
    approved: {
      label: "Confirmé",
      class: "bg-green-100 text-green-700",
    },
    rejected: {
      label: "Rejeté",
      class: "bg-red-100 text-red-700",
    },
    pending: {
      label: "En attente",
      class: "bg-yellow-100 text-yellow-700",
    },
  };


  return (
    <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen py-8">
      <PageHeader title = "Gestion des Vehicules" subtitle="gesfvnsfjvjksfjk svjsjnvsjkrvsw" num={total} />
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

         <Link to="/admin/addVehicule">
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 w-full sm:w-auto"
  >
    NEW Vehicule
  </motion.button>
</Link>

          </motion.div>

          {/* Loading */}
          {loading && <GlobalLoader />}

          {/* Vehicule Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-neutral-500 text-white uppercase text-sm rounded-lg">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Immatriculation</th>
                  <th className="px-6 py-3">Statut</th>
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
                    <td className="px-6 py-4">
                    <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4
  ${statusConfig[vehicule.statut]?.class}`}
              >
                {statusConfig[vehicule.statut]?.label}
              </span>
                    </td>
                    <td className="px-6 py-4">{vehicule.prix_day} DH</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/admin/editVehicule/${vehicule.id}`}><motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <TbEdit size={20} />
                      </motion.button></Link>
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

        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={(page) => getVehicules(page)}
        />
      </main>
    </div>
  );
}

export default Vehicules;
