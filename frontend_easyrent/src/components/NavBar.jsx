import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-10 py-6 bg-gradient-to-r from-black via-blue-950 to-black text-white">
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">Accueil</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact Nous</Link>
        <Link to="/" className="hover:text-blue-400">A propos </Link>
      </div>

      <div className="absolute top-1/2 left-1/2 h-10 flex justify-center -translate-x-1/2 -translate-y-1/2 ">
        <motion.img
          src="/logo.png"
          className="h-10"
          initial={{ x: "50%" }}           
          animate={{ x: ["-50%", "50%", "50%"] }} 
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </div>

      <div className="space-x-6">
        <Link to="/listVehicule" className="hover:text-blue-400">Vehicules</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg">Login</Link>
      </div>
    </nav>
  );
}
