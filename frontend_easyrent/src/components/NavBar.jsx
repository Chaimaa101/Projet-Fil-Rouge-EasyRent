import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  FaBars,
  FaBlog,
  FaHeart,
  FaTimes,
  FaUser,
  FaFileInvoice,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);

  const [openUser, setOpenUser] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (manageRef.current && !manageRef.current.contains(e.target)) {
        setOpenManage(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative flex items-center justify-between px-10 py-6 text-black">

      {/* LEFT */}
      <div className="hidden lg:flex space-x-6">
        <Link to="/">Accueil</Link>
        <Link to="/vehicules">Véhicules</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">À propos</Link>
      </div>

      {/* LOGO */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <motion.img
          src="/logo-bg.png"
          className="h-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex items-center gap-6">

        {/* MANAGEMENT */}
        {(isAdmin || user) && (
          <div className="relative">
            <button
              onClick={() => setOpenManage(!openManage)}
              className="flex items-center gap-1"
            >
              {isAdmin ? "Management" : "Véhicules"}
              {openManage ? <BiChevronUp /> : <BiChevronDown />}
            </button>

            <AnimatePresence>
              {openManage && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-3 bg-white shadow-lg rounded-lg w-48 p-2 z-50"
                >
                  <li><Link to="/admin/vehicules" className="block px-3 py-2 hover:bg-gray-100">Véhicules</Link></li>
                  <li><Link to="/admin/avis" className="block px-3 py-2 hover:bg-gray-100">Avis</Link></li>
                  {isAdmin && (
                    <>
                      <li><Link to="/admin/users" className="block px-3 py-2 hover:bg-gray-100">Utilisateurs</Link></li>
                      <li><Link to="/admin/reservations" className="block px-3 py-2 hover:bg-gray-100">Réservations</Link></li>
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* USER */}
        {user ? (
          <div className="relative" >
            <FaFileInvoice />
            <FaHeart />

            <button onClick={() => setOpenUser(!openUser)}>
              <FaUser className="text-teal-500" />
            </button>

            <AnimatePresence>
              {openUser && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-48 p-2 z-50"
                >
                  <li><Link to="/profile" className="block px-3 py-2 hover:bg-gray-100">Mon profil</Link></li>
                  <li><Link to="/historique" className="block px-3 py-2 hover:bg-gray-100">Historique</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt /> Déconnexion
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-900 text-white px-4 py-2 rounded-lg">
            Connexion
          </Link>
        )}
      </div>

      {/* MOBILE */}
      <div className="lg:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </nav>
  );
}
