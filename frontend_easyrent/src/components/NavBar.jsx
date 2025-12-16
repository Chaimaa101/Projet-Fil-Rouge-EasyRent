import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 bg-gradient-to-r from-black via-blue-950 to-black text-white">
      <h1 className="text-2xl font-bold">RENTAL</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg">
          Login
        </Link>
      </div>
    </nav>
  );
}
