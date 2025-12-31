
import { BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { AdminContext } from "../../Context/AdminProvider";
import { MdSearch } from "react-icons/md";
import { ReservationsContext } from "../../Context/ReservationProvider";

function Reservations() {
  const [searchTerm, setSearchTerm] = useState("");

  const {allReservations ,getAllReservations, loading,errors,pagination,total } = useContext( AdminContext)
  const { deletereservations} = useContext( ReservationsContext)

 const filteredReservations = allReservations.filter((v) =>
    v.user.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );


useEffect(() =>{
  getAllReservations()
},[])

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Voulez-vous vraiment supprimer cette reservation ?"
  );

  if (!confirmed) return;

      await deletereservations(id)
 
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
    }
  };


  return (
    <>
      <div className="flex-1 relative overflow-auto z-10">
                   <PageHeader title = "Gestion des reservations" subtitle="gesfvnsfjvjksfjk svjsjnvsjkrvsw" num={total} />
       
     <main className="container max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
           
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
                           placeholder="Search User..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                         />
                         <MdSearch size={25} className="text-gray-500" />
                       </div>
                     </motion.div>
           
                     {/* Loading */}
                     {loading ?? <GlobalLoader />}
          <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-x-auto"
                    >
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                 
                    <th scope="col" className="px-6 py-3">
                    Nom User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nom Véhicule
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
                      
                      <td className="px-6 py-4">{reserv?.user?.nom} {reserv?.user?.prenom}</td>
                      <td className="px-6 py-4 truncate">{reserv?.vehicule?.nom}</td>
                      <td className="px-6 py-4 truncate">{reserv.days} days</td>
                      <td className="px-6 py-4 truncate">{reserv.total_price}DH</td>

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
            <Pagination currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={(page) => getAllReservations(page)}
          />
      
          </div>
        </main>
      </div>
    </>
  );
}


export default Reservations;
