import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AvisContext } from "../../Context/AvisProvider";
import toast from "react-hot-toast";
import TextareaInput from "../../components/formCompenents/TextareaInput";

export default function CommentModal({ reservation, onClose }) {
  const { createAvis, errors, loading } = useContext(AvisContext);

  const {
    register,
    handleSubmit,
    formState: { errors: frontErrors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      reservation_id: reservation.id,
      avis: data.avis,
      rating: data.rating,
    };

    const result = await createAvis(payload,reservation.id);

    if (result) {
      onClose();
    } 
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Ajouter un commentaire
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextareaInput
            label="Votre commentaire"
            name="avis"
            register={register}
            rules={{ required: "Le commentaire est obligatoire" }}
            frontErrors={frontErrors}
            backErrors={errors}
          />

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Note (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("rating", {
                required: "La note est obligatoire",
                min: 1,
                max: 5,
              })}
              className={`w-full px-4 py-2 border rounded-md ${
                frontErrors?.rating ? "border-red-500" : "border-gray-300"
              }`}
            />
            {frontErrors?.rating && (
              <p className="text-red-500 text-sm mt-1">
                {frontErrors.rating.message}
              </p>
            )}
          </div>

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
              {loading ? "Enregistrement..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
