import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Pagination from "../../components/Pagination";
import GlobalLoader from "../../components/common/GlobalLoader";
import { UserContext } from "../../Context/UsersContext";
import PageHeader from "../../components/PageHeader";

function Users() {
  const { pagination, users, getUsers, loading ,total} =
    useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((v) =>
    v.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen py-8">

            <PageHeader title = "Gestion des users" subtitle="gesfvnsfjvjksfjk svjsjnvsjkrvsw" num={total} />
      
      <main className="container max-w-7xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          {/* Search & New User */}
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

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 w-full sm:w-auto"
            >
              NEW User
            </motion.button>
          </motion.div>

          {/* Loading */}
          {loading ?? 
          <GlobalLoader />}

          {/* User Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-gray-700 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-neutral-500 text-white uppercase text-sm rounded-lg">
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Prenom</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">tel</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((User, index) => (
                  <motion.tr
                    key={User.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <td className="px-6 py-4">{User.nom}</td>
                    <td className="px-6 py-4">{User.prenom}</td>
                    <td className="px-6 py-4">{User.role}</td>
                    <td className="px-6 py-4">{User.email}</td>
                    <td className="px-6 py-4">{User.details?.tel}</td>
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

        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={(page) => getUsers(page)}
        />
      </main>
    </div>
  );
}

export default Users;
