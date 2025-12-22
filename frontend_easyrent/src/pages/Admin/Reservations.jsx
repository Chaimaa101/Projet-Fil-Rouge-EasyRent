
import { BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import { ReservationsContext } from "../../Context/ReservationProvider";

function Reservations() {

  const {reservations ,getReservations, loading,errors} = useContext( ReservationsContext)


  const handleDeletereservations = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservations?"
    );

  };

  return (
    <>
      <div className="flex-1 relative overflow-auto z-10">
     <main className="container max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
                    <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-4"
            >
              <h2 className="text-xl font-bold text-gray-900">Reservations</h2>
              <p className="text-lg font-medium text-gray-700">
                Total reservations: <span className="">{reservations.length}</span>
              </p>
            </motion.div>
           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                 
                    <th scope="col" className="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reserv, index) => (
                    <motion.tr
                      key={reserv.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white breserv-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      
                      <td className="px-6 py-4">{reserv?.user?.nom} {reserv?.user?.prenom}</td>
                      <td className="px-6 py-4 truncate">{reserv.total_price}DH</td>
                      <td className="px-6 py-4 truncate">{reserv.status}</td>

                      <td className="px-6 py-4 truncate">{reserv.user.details.phone}</td>
                      <td className="px-6 py-4 ">
                        <motion.button
                          className="text-center text-red-500 hover:text-red-700 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
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
        </main>
      </div>
    </>
  );
}


export default Reservations;
