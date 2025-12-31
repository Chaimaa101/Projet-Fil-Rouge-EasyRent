import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserContext } from "../../../Context/UsersContext";

export default function AjouterMarque({ user, onClose }) {
  const { updateUser, loading, errors } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors: frontErrors },
  } = useForm({
    defaultValues: {
      role: user.role,
    },
  });

  const onSubmit = async (data) => {
    const result = await updateUser(user.id, data);

    if (result) {
      toast.success("Rôle mis à jour avec succès");
      onClose();
    } else {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Modifier le rôle de l'utilisateur
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Role select */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Rôle</label>

            <select
              {...register("role", { required: "Le rôle est obligatoire" })}
              className={`w-full px-4 py-2 border rounded-md ${
                frontErrors?.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Sélectionner un rôle --</option>
              <option value="admin">Admin</option>
              <option value="client">client</option>
            </select>

            {frontErrors?.role && (
              <p className="text-red-500 text-sm mt-1">
                {frontErrors.role.message}
              </p>
            )}

            {errors?.role && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role[0]}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg"
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
