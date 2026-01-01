import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BrandContext } from "../../../Context/BrandProvider";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

export default function BrandForm({ brand = null, onClose }) {
  const { createBrand, updateBrand, loading, errors } = useContext(BrandContext);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: frontErrors },
  } = useForm({
    defaultValues: {
      nom: "",
    },
  });
  useEffect(() => {
    if (brand) {
      setValue("nom", brand.nom);
      if (brand.image) {
        setPreview(brand.image);
      }
    }
  }, [brand, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nom", data.nom);

    if (image) {
      formData.append("image", image);
    }

    const result = brand
      ? await updateBrand(brand.id, formData)
      : await createBrand(formData);

    if (result) {
      toast.success(
        brand ? "Marque modifiée avec succès" : "Marque ajoutée avec succès"
      );
      onClose();
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {brand ? "Modifier la marque" : "Ajouter une marque"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nom */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nom de la marque</label>
            <input
              type="text"
              {...register("nom", { required: "Le nom est obligatoire" })}
              className={`w-full px-4 py-2 border rounded-md ${
                frontErrors.nom ? "border-red-500" : "border-gray-300"
              }`}
            />
            {frontErrors.nom && (
              <p className="text-red-500 text-sm mt-1">
                {frontErrors.nom.message}
              </p>
            )}
            {errors?.nom && (
              <p className="text-red-500 text-sm mt-1">{errors.nom[0]}</p>
            )}
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block">Image</label>

            <div className="relative w-32 h-32">
              <label className="w-full h-full border-2 border-dashed flex items-center justify-center rounded-md cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <FaCloudUploadAlt className="text-teal-500 text-2xl" />
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {preview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <FaTrash size={12} />
                </button>
              )}
            </div>
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
              {loading
                ? "Enregistrement..."
                : brand
                ? "Mettre à jour"
                : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
