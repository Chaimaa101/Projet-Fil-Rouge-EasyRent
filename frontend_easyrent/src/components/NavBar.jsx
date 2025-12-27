import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaBars, FaHeart, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthProvider";
import NotificationDropdown from "./Notification";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

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
    <nav className="relative flex items-center justify-between px-6 lg:px-10 py-5 bg-white shadow-md text-gray-800">
      <div className="hidden lg:flex items-center gap-6 font-medium">
        <Link to="/" className="hover:text-teal-600 transition">
          Accueil
        </Link>
        <Link to="/listVehicule" className="hover:text-teal-600 transition">
          Véhicules
        </Link>

        {!user && (
          <>
            <Link to="/contact" className="hover:text-teal-600 transition">
              Contact
            </Link>
            <Link to="/apropos" className="hover:text-teal-600 transition">
              À propos
            </Link>
          </>
        )}

        {isAdmin && (
          <Link
            to="/admin/dashboard"
            className="hover:text-teal-600 transition"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/">
          <motion.img
            src="/logo-bg.png"
            className="h-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>
      </div>

      <div className="items-center gap-4 hidden lg:flex">
        {!user && (
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/howitworks" className="hover:text-teal-600 transition">
              Comment ça marche ?
            </Link>
          </div>
        )}

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
                  {!isAdmin ? (
                    <>
                      <li>
                        <Link to="/client/myReserv" className="dropdown-item">
                          Mes réservations
                        </Link>
                      </li>
                      <li>
                        <Link to="/client/avis" className="dropdown-item">
                          Mes commentaires
                        </Link>
                      </li>
                      <li>
                        <Link to="/client/payments" className="dropdown-item">
                          Mes paiements
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/admin/vehicules" className="dropdown-item">
                          Gérer les véhicules
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/users" className="dropdown-item">
                          Gérer les utilisateurs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/reservations"
                          className="dropdown-item"
                        >
                          Gérer les réservations
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/avis" className="dropdown-item">
                          Gérer les commentaires
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/brands" className="dropdown-item">
                          Gérer les marques
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/payments" className="dropdown-item">
                          Gérer les paiements
                        </Link>
                      </li>
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {user ? (
          <div className="relative flex items-center gap-4" ref={userRef}>
            <NotificationDropdown />
            <Link to="/favoris">
              <FaHeart className="cursor-pointer hover:text-red-500 transition" />
            </Link>

            <button onClick={() => setOpenUser(!openUser)}>
              <FaUser className="text-teal-600 hover:text-teal-800 transition" />
            </button>

            <AnimatePresence>
              {openUser && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-8 bg-white shadow-lg rounded-lg w-52 p-2 z-50"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Mon profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
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

      <div className="lg:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-50"
          >
            <ul className="flex flex-col gap-4 p-6 font-medium">
              {/* Public */}
              <li>
                <Link to="/" onClick={() => setIsMobileOpen(false)}>
                  Accueil
                </Link>
              </li>

              <li>
                <Link to="/listVehicule" onClick={() => setIsMobileOpen(false)}>
                  Véhicules
                </Link>
              </li>

              {!user && (
                <>
                  <li>
                    <Link
                      to="/howitworks"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Comment ça marche ?
                    </Link>
                  </li>
                  <li>
                    <Link to="/apropos" onClick={() => setIsMobileOpen(false)}>
                      A propos
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setIsMobileOpen(false)}>
                      Contact
                    </Link>
                  </li>
                </>
              )}

              {user && !isAdmin && (
                <>
                  <hr />

                  <li>
                    <Link to="/favoris" onClick={() => setIsMobileOpen(false)}>
                      Favoris
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/client/myReserv"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Mes réservations
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/client/avis"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Mes commentaires
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/client/payments"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Mes paiements
                    </Link>
                  </li>

                  <li>
                    <Link to="/profile" onClick={() => setIsMobileOpen(false)}>
                      Mon profil
                    </Link>
                  </li>
                </>
              )}

              {/* ADMIN */}
              {isAdmin && (
                <>
                  <hr />

                  <li>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/vehicules"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les véhicules
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/reservations"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les réservations
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/users"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les utilisateurs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/brands"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les marques
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/avis"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les avis
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/payments"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Gérer les paiements
                    </Link>
                  </li>
                </>
              )}

            
              <hr />

              {user ? (
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileOpen(false);
                    }}
                    className="text-red-600"
                  >
                    Déconnexion
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                    Se connecter
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
