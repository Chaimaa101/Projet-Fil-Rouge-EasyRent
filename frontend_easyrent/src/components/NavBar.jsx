import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  FaBars,
  FaHeart,
  FaTimes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);

  const [openUser, setOpenUser] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const manageRef = useRef(null);
  const userRef = useRef(null);

  const isAdmin = user?.role === "admin";
  const notificationsCount = 3; 

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
    <nav className="relative flex items-center justify-between px-10 py-5 bg-white shadow-md text-gray-800">

      {/* LEFT */}
      <div className="hidden lg:flex items-center gap-6 font-medium">
        <Link className="hover:text-teal-600 transition" to="/">Accueil</Link>
        <Link className="hover:text-teal-600 transition" to="/listVehicule">Véhicules</Link>
        <Link className="hover:text-teal-600 transition" to="/contact">Contact</Link>
        <Link className="hover:text-teal-600 transition" to="/apropos">À propos</Link>
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

        <Link className="hover:text-teal-600 transition" to="/howitworks">
          Comment ça marche ?
        </Link>

        <Link className="hover:text-teal-600 transition" to="/blogs">
          Blog
        </Link>

        {/* MANAGEMENT */}
        {(isAdmin || user) && (
          <div className="relative" ref={manageRef}>
            <button
              onClick={() => setOpenManage(!openManage)}
              className="flex items-center gap-1 font-medium hover:text-teal-600"
            >
              {isAdmin ? "Administration" : "Historique"}
              {openManage ? <BiChevronUp /> : <BiChevronDown />}
            </button>

            <AnimatePresence>
              {openManage && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 bg-white shadow-lg rounded-lg w-52 p-2 z-50"
                >
                  {!isAdmin && (
                    <>
                      <li><Link to="/client/myreservations" className="dropdown-item">Mes réservations</Link></li>
                      <li><Link to="/client/avis" className="dropdown-item">Mes commentaires</Link></li>
                      <li><Link to="/client/payments" className="dropdown-item">Mes paiements</Link></li>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <li><Link to="/admin/vehicules" className="dropdown-item">Véhicules</Link></li>
                      <li><Link to="/admin/users" className="dropdown-item">Utilisateurs</Link></li>
                      <li><Link to="/admin/reservations" className="dropdown-item">Réservations</Link></li>
                      <li><Link to="/admin/avis" className="dropdown-item">Commentaires</Link></li>
                      <li><Link to="/admin/brands" className="dropdown-item">Marques</Link></li>
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* USER */}
        {user ? (
          <div className="relative flex items-center gap-4" ref={userRef}>

            {/* Notifications */}
            <div className="relative cursor-pointer">
              <FiBell size={22} className="hover:text-teal-600 transition" />
              {notificationsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {notificationsCount}
                </span>
              )}
            </div>

            
<Link to="/favoris"><FaHeart className="cursor-pointer hover:text-red-500 transition" /></Link>
            {/* User menu */}

            <button onClick={() => setOpenUser(!openUser)}>
              <FaUser className="text-teal-600 hover:text-teal-800 transition" />
            </button>

            <AnimatePresence>
              {openUser && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-35 bg-white shadow-lg rounded-lg w-52 p-2 z-50"
                >
                  <li><Link to="/profile" className="dropdown-item">Mon profil</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      <FaSignOutAlt /> Déconnexion
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
          >
            Se connecter
          </Link>
        )}
      </div>

      {/* MOBILE MENU ICON */}
      <div className="lg:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      {isMobileOpen && (
  <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-50">
    <ul className="flex flex-col gap-4 p-6">
      <li><a href="/" className="hover:text-teal-500">Home</a></li>
      <li><a href="/vehicles" className="hover:text-teal-500">Vehicles</a></li>
      <li><a href="/reservations" className="hover:text-teal-500">Reservations</a></li>
      <li><a href="/contact" className="hover:text-teal-500">Contact</a></li>
    </ul>
  </div>
)}

    </nav>
  );
}
