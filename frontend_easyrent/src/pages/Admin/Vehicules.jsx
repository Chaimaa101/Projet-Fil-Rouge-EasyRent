import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import Pagination from "../../components/common/Pagination";
import PageHeader from "./common/PageHeader";
import GlobalLoader from "../../components/common/GlobalLoader";
import { useNavigate } from "react-router-dom";
import VehiculeForm from "./Forms/VehiculeForm";

function Vehicules() {
  const {
    pagination,
    vehicules,
    getVehicules,
    loading,
    total,
    deleteVehicule,
    toggleVehiculeIsTop,
  } = useContext(VehiculeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicule, setSelectedVehicule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getVehicules();
  }, []);

  const handleOpenModal = (vehicule = null) => {
    setSelectedVehicule(vehicule);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVehicule(null);
    getVehicules(); // Rafraîchir la liste après création/édition
  };

  const filteredVehicules = vehicules.filter((v) =>
    v.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusConfig = {
    disponible: { label: "Disponible", class: "bg-green-100 text-green-700" },
    loue: { label: "Loué", class: "bg-neutral-200 text-neutral-700" },
    maintenance: {
      label: "Maintenance",
      class: "bg-yellow-100 text-yellow-700",
    },
    indisponible: { label: "Indisponible", class: "bg-red-100 text-red-700" },
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce véhicule ?")) return;
    const result = await deleteVehicule(id);
    if (result) getVehicules();
  };

  return (
    <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen py-8">
      <PageHeader
        title="Gestion des Véhicules"
        subtitle="Consultez, ajoutez et gérez l'ensemble des véhicules disponibles"
        num={total}
      />

      <main className="container max-w-7xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6"
          >
            <div className="flex items-center w-full sm:w-1/2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
              <input
                type="text"
                placeholder="Rechercher une vehicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"
              />
              <MdSearch size={25} className="text-gray-500" />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 w-full sm:w-auto"
              onClick={() => handleOpenModal()}
            >
              NEW Vehicule
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
               {/* {loading && <GlobalLoader />} */}
            <table className="w-full text-left text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-neutral-500 text-white uppercase text-sm rounded-lg">
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Immatriculation</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Prix</th>
                  <th className="px-6 py-3">Actif</th>
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
                    <td className="px-6 py-4">
                      {vehicule?.images?.[0]?.path ? (
                        <img
                          src={vehicule.images[0].path}
                          alt="car"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <img
                          src="/brabus.jpg"
                          alt="Profil"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">{vehicule.nom}</td>
                    <td className="px-6 py-4">{vehicule.marque.nom}</td>
                    <td className="px-6 py-4">{vehicule.immatriculation}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                          statusConfig[vehicule.status]?.class
                        }`}
                      >
                        {statusConfig[vehicule.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">{vehicule.prix_day} DH</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVehiculeIsTop(vehicule.id)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition
      ${
        vehicule.isTop
          ? "bg-teal-100 text-teal-700 hover:bg-teal-200"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
                      >
                        {vehicule.isTop ? "Actif" : "Désactivé"}
                      </button>
                    </td>

                    <td className="px-6 py-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-purple-500 hover:text-purple-700"
                        onClick={() =>
                          navigate(`/error`)
                        }
                      >
                        <FaEye size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleOpenModal(vehicule)}
                      >
                        <TbEdit size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(vehicule.id)}
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

      {openModal && (
        <VehiculeForm
          vehicule={selectedVehicule}
          onClose={handleCloseModal}
          isEdit={!!selectedVehicule}
        />
      )}
    </div>
  );
}

export default Vehicules;
