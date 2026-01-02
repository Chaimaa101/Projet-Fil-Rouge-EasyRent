import { Save } from "lucide-react";
import TextInput from "../../components/formCompenents/TextInput";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ProfileForm({ user,loading, handleFileChange, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user) return;

    reset({
      nom: user.nom ?? "",
      prenom: user.prenom ?? "",
      email: user.email ?? "",
      tel: user.details?.tel ?? "",
      adresse: user.details?.adresse ?? "",
      CNI: user.details?.CNI ?? "",
      permi_licence: user.details?.permi_licence ?? "",
      genre: user.details?.genre ?? "",
      date_naissance: user.details?.date_naissance ?? "",
    });
  }, [user, reset]);

  return (
    <div className="lg:w-2/3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Mettre à jour le profil
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput label="Nom" name="nom" register={register} />
          <TextInput label="Prénom" name="prenom" register={register} />
          <TextInput label="Téléphone" name="tel" register={register} />
          <TextInput label="Adresse" name="adresse" register={register} />
          <TextInput label="CNI" name="CNI" register={register} />
          <TextInput
            label="Permi-licence"
            name="permi_licence"
            register={register}
          />
          <TextInput label="Genre" name="genre" register={register} />
          <TextInput
            label="Date de naissance"
            name="date_naissance"
            type="date"
            register={register}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo de profil</label>
          <input
            type="file"
            {...register("photo_profil")}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
