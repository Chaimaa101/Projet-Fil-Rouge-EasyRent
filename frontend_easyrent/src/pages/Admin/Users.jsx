import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdSearch, MdStar } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import { Users } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};

function Users() {
  const { users, getUsers, loading, errors } =
    useContext();

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this vehicule?")) {
      router.delete(`/Users/${id}`, {
        preserveScroll: true,
      });
    }
  };

  return (
    <>
      <div className="flex-1 relative overflow-auto z-10">
        <main className="container max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white/10 backdrop-blur-xl p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mb-4"
            >
              <div className="w-full flex items-center gap-2 px-4 py-2 bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-300 bg-black/40 ">
                <input
                  type="text"
                  className="bg-transparent text-gray-300 placeholder-gray-400 outline-none w-full"
                  placeholder="vehicule NAME"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdSearch size={25} className="text-gray-700" />
              </div>
              <motion.button
                onClick={handleDelete}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-fit bg-blue-600 py-2 px-4 rounded-lg text-nowrap"
              >
                NEW vehicule
              </motion.button>
            </motion.div>

            {/* Loading State */}
            {loading && <LoadingSpinner />}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-x-auto my-4"
            >
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((vehicule, index) => (
                    <motion.tr
                      key={vehicule.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* <td className="p-2 w-20 h-20">
                                                    {vehicule.images?.length >
                                                    0 ? (
                                                        <motion.img
                                                            src={
                                                                vehicule
                                                                    ?.images[0]
                                                                    ?.images[0]
                                                            }
                                                            alt={`vehicule: ${vehicule.name}`}
                                                            className="w-full h-full object-cover rounded-lg"
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-500 text-xs">
                                                                No Image
                                                            </span>
                                                        </div>
                                                    )}
                                                </td> */}
                      <td className="p-2">{vehicule.nom}</td>
                      <td className="p-2">{vehicule.brand.name}</td>
                      <td className="p-2">{vehicule.immatriculation}</td>
                      <td className="p-2">{vehicule.color}</td>
                      <td className="px-6 py-4">{vehicule.prix_day}DH</td>
                      <td className="px-6 py-4">
                        <motion.button
                          className="pr-1 text-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                        >
                          <TbEdit size={20} aria-label="Edit" />
                        </motion.button>
                        <motion.button
                          className="text-center text-red-500 hover:text-red-700 transition-colors duration-200"
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
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

export default Users;
