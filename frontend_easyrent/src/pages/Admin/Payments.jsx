import { BiTrash } from "react-icons/bi";
import { motion } from "framer-motion";
import PageHeader from "./common/PageHeader";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminProvider";
import Pagination from "../../components/common/Pagination";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Paymentns() {
  const { payments, getPayments, loading, errors, pagination, total } =
    useContext(AdminContext);

  useEffect(() => {
    getPayments();
  }, []);

  const navigate = useNavigate();

  const statusConfig = {
    pending: {
      label: "En attente",
      class: "bg-yellow-100 text-yellow-700",
    },
    success: {
      label: "Payé",
      class: "bg-green-100 text-green-700",
    },
    failed: {
      label: "échec",
      class: "bg-red-100 text-red-700",
    },
  };


  return (
    <>
      <div className="flex-1 relative overflow-auto z-10 min-h-screen bg-gray-100">
        <PageHeader
          title="Gestion des Paymentns"
          subtitle="Consulter les payments effectués"
          num={total}
        />

        <main className="container max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-4"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-neutral-500 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                   
                    <th scope="col" className="px-6 py-3">
                      email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      reservation #
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
                  {payments.map((reserv, index) => (
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
                      <td className="px-6 py-4 truncate">{reserv.amount}DH</td>
                

                      <td className="px-6 py-4 truncate">
                        {reserv?.user?.email}
                      </td>
                      <td className="px-6 py-4 truncate">
                        {reserv?.reservation?.id}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
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
                          onClick={() => navigate("/error")}
                        >
                          {" "}
                          <FaEye size={20} />
                        </motion.button>
                
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </main>
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={(page) => getPayments(page)}
        />
      </div>
    </>
  );
}

export default Paymentns;
