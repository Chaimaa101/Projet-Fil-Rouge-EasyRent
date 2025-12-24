import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { register, loading,errors  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(formData);

  };

  return (
    <div className="min-h-screen flex items-center justify-center to-teal-300">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md bg-gradient-to-b from-[#71C9CE] to-[#CBF1F5] text-white"
        onSubmit={handleRegister}
        >
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
                errors?.nom ? "border border-red-500" : ""
              }`}
              placeholder="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
            {errors?.nom && (
              <p className="text-red-400 text-xs mt-1">{errors.nom}</p>
            )}
          </div>

          <div>
            <input
              className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
                errors?.prenom ? "border border-red-500" : ""
              }`}
              placeholder="Prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
            {errors?.prenom && (
              <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
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

        {/* Password */}
        <div className="mb-4">
          <input
            className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
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

        {/* Confirm Password */}
        <div className="mb-6">
          <input
            className={`w-full p-3 rounded bg-white/80 focus:outline-none text-black ${
              errors?.password_confirmation ? "border border-red-500" : ""
            }`}
            placeholder="Confirmation du mot de passe"
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors?.password_confirmation && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password_confirmation}
            </p>
          )}
        </div>


        <button
          disabled={loading}
          className="w-full py-3 bg-teal-600 rounded-xl hover:bg-teal-700 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </motion.form>
    </div>
  );
}
