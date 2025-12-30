import { motion } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";

export default function ProfileForm() {

    const { user, errors, updateProfile } = useContext(AuthContext);
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      adresse: user.details?.adresse || "",
      CNI: user.details?.CNI || "",
      tel: user.details?.tel || "",
      genre: user.details?.genre || "",
      date_naissance: user.details?.date_naissance || "",
    },
  });

  return (
    <motion.form
      onSubmit={handleSubmit(updateProfile)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8 space-y-6"
    >
      <h3 className="text-lg font-semibold text-teal-700">Edit Profile</h3>

      {/* User */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register("nom")} placeholder="Nom" className="input-teal" />
        <input {...register("prenom")} placeholder="Prénom" className="input-teal" />
        <input {...register("email")} type="email" placeholder="Email" className="input-teal" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register("adresse")} placeholder="Adresse" className="input-teal" />
        <input {...register("tel")} placeholder="Téléphone" className="input-teal" />
        <input type="date" {...register("date_naissance")} className="input-teal" />

        <select {...register("genre")} className="input-teal">
          <option value="">Genre</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold"
      >
        Save Changes
      </motion.button>
    </motion.form>
  );
}
