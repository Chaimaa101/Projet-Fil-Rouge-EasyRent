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
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UpdateUserRoleModal from "./Forms/UserForm";

function Users() {
  const { pagination, users, getUsers, loading, total, deleteUser } =
    useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate  = useNavigate()
  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((v) =>
    v.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmed) return;

    const ok = await deleteUser(id);

    if (ok) {
      // tu peux juste recharger la liste, pas besoin de navigate
      getUsers();
      toast.success("Utilisateur supprimé avec succès");
    }
  };

  const [openRoleModal, setOpenRoleModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

const openModal = (user) => {
  setSelectedUser(user);
  setOpenRoleModal(true);
};

const closeModal = () => {
  setOpenRoleModal(false);
  setSelectedUser(null);
};


  const statusConfig = {
    admin: {
      label: "Admin",
      class: "bg-green-100 text-green-700",
    },
    client: {
      label: "Client",
      class: "bg-orange-100 text-orange-700",
    },
  };

  return (
    <div className="flex-1 relative overflow-auto z-10 bg-gray-100 min-h-screen py-8">
      <PageHeader
        title="Gestion des users"
        subtitle="gesfvnsfjvjksfjk svjsjnvsjkrvsw"
        num={total}
      />

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
          </motion.div>

          {/* Loading */}
          {loading ?? <GlobalLoader />}

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
                  <th className="px-6 py-3">Profile</th>
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
                    <td className="px-6 py-4">
                      {User?.details?.photo_profil ? (
                        <img
                          src={User.details.photo_profil}
                          alt="Profil"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <img
                          src="/profile.jpg"
                          alt="Profil"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      )}
                    </td>

                    <td className="px-6 py-4">{User.nom}</td>
                    <td className="px-6 py-4">{User.prenom}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4
                         ${statusConfig[User.role]?.class}`}
                      >
                        {statusConfig[User.role]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">{User.email}</td>
                    <td className="px-6 py-4">{User.details?.tel}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-purple-500 hover:text-purple-700"
                      
                      >
                        <FaEye size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(User)}
                      >
                        <TbEdit size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(User.id)}
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
      <Pagination
        currentPage={pagination.currentPage}
        lastPage={pagination.lastPage}
        onPageChange={(page) => getUsers(page)}
      />

      {openRoleModal && (
  <UpdateUserRoleModal
    user={selectedUser}
    onClose={closeModal}
  />
)}
    </div>
  );
}

export default Users;
