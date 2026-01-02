import { BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import PageHeader from "./common/PageHeader";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import { AdminContext } from "../../Context/AdminProvider";
import { MdSearch } from "react-icons/md";
import { ReservationsContext } from "../../Context/ReservationProvider";
import { FaEye } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

function Reservations() {
  const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  

  const {
    allReservations,
    getAllReservations,
    loading,
    errors,
    pagination,
    total,
  } = useContext(AdminContext);
  const { deletereservations } = useContext(ReservationsContext);

  const filteredReservations = allReservations.filter(
    (v) =>
      v.user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vehicule.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllReservations();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette reservation ?"
    );

    if (!confirmed) return;

    await deletereservations(id);

    getAllReservations();
  };

  const statusConfig = {
    pending: {
      label: "En attente",
      class: "bg-yellow-100 text-yellow-700",
    },
    paid: {
      label: "Payé",
      class: "bg-green-100 text-green-700",
    },
    cancelled: {
      label: "Annulé",
      class: "bg-red-100 text-red-700",
    },
  };

  return (
    <>
      <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen">
        <PageHeader
          title="Gestion des Réservations"
          subtitle="Consultezl'ensemble des Réservations"
          num={total}
        />

        <main className="container max-w-7xl mx-auto px-4 ">
          <div className="bg-white/80 p-6 rounded-lg">
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
                  placeholder="Rechercher une réservation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                <MdSearch size={25} className="text-gray-500" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              {loading ?? <GlobalLoader />}
              <table className="w-full text-sm text-left text-gray-500">
                <thead className=" bg-neutral-500 text-white uppercase text-sm rounded-l">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Véhicule
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nombre des jours
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Montant Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reserv, index) => (
                    <motion.tr
                      key={reserv.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white breserv-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        {reserv?.user?.nom} {reserv?.user?.prenom}
                      </td>
                      <td className="px-6 py-4 truncate">
                        {reserv?.vehicule?.nom}
                      </td>
                      <td className="px-6 py-4 truncate">{reserv.days} days</td>
                      <td className="px-6 py-4 truncate">
                        {reserv.total_price}DH
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4
  ${statusConfig[reserv.status]?.class}`}
                        >
                          {statusConfig[reserv.status]?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 ">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-purple-500 hover:text-purple-700 mr-2"
                           onClick={() =>
                          navigate("/error")
                        }
                        >
                          {" "}
                          <FaEye size={20} />
                        </motion.button>
                        <motion.button
                          className="text-center text-red-500 hover:text-red-700 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(reserv.id)}
                        >
                          <BiTrash size={20} aria-label="Delete" />
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
            onPageChange={(page) => getAllReservations(page)}
          />
        </main>
      </div>
    </>
  );
}

export default Reservations;
