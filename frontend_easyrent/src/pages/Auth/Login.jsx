import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleEye = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login,user, errors, loading } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
const response = await login(formData); 

  if (user) {
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/complete-profile"); 
  }
  }}

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-[#71C9CE] to-[#CBF1F5] p-10 rounded-2xl w-full max-w-md text-white"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-800">Connexion</h2>

        <div className="mb-4">
          <input
            className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
              errors?.email ? "border border-red-500" : ""
            }`}
            placeholder="Adresse email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
              errors?.password ? "border border-red-500" : ""
            }`}
            placeholder="Mot de passe"
              type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={toggleEye}
            className="absolute text-gray-500 dark:text-gray-400 top-[10px] right-[8px] cursor-pointer"
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
          {errors?.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <Link
          to={"/resetpassword"}
          className="ml-auto text-xs mt-2 text-teal-900 hover:text-teal-500  w-fit"
        >
          Mot de passe oublie ?
        </Link>

        <button
          type="submit"
          className="w-full py-3 bg-teal-700 hover:bg-teal-600 text-white rounded-xl mt-3"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          No account?{" "}
          <Link to="/register" className="text-teal-900 underline">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
