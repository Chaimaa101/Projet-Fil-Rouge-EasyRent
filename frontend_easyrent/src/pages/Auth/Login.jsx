import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { login, errors, loading, successMessage } = useContext(AuthContext);

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

      const result = await login(formData);

      if (result?.success && successMessage) {
        toast.success(successMessage);
        navigate("/"); 
      } 

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md text-white"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

         <div className="mb-4">
          <input
            className={`w-full p-3 rounded bg-black/40 focus:outline-none ${
              errors?.email ? "border border-red-500" : ""
            }`}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors?.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-3 rounded bg-black/40 focus:outline-none ${
              errors?.password ? "border border-red-500" : ""
            }`}
            placeholder="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors?.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 rounded-xl"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center mt-4 text-sm">
          No account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
