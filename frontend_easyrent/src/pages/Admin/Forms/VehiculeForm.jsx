import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { VehiculeContext } from "../../../Context/VehiculeProvider";
import { BrandContext } from "../../../Context/BrandProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import TextInput from "../../../components/formCompenents/TextInput";
import SelectInput from "../../../components/formCompenents/SelectInput";
import TextareaInput from "../../../components/formCompenents/TextareaInput";
import GlobalLoader from "./../../../components/common/GlobalLoader";

export default function VehiculeForm({
  vehicule: selectedVehicule,
  onClose,
  isEdit = false,
}) {
  const { createVehicule, updateVehicule, getVehicule, errors, loading } =
    useContext(VehiculeContext);
  const { brands, categories, getBrands, getCategories } =
    useContext(BrandContext);
  const { id } = useParams();


  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: frontErrors },
  } = useForm();

  useEffect(() => {
    getBrands();
    getCategories();

    if (isEdit && id) {
      getVehicule(id);
    }
  }, [getBrands, getCategories, getVehicule, id, isEdit]);

  // Remplir le formulaire si édition
  useEffect(() => {
    if (isEdit && selectedVehicule) {
      reset({
        nom: selectedVehicule.nom,
        annee: selectedVehicule.annee,
        prix_day: selectedVehicule.prix_day,
        registration_number: selectedVehicule.registration_number,
        immatriculation: selectedVehicule.immatriculation,
        seats: selectedVehicule.seats,
        transmission: selectedVehicule.transmission,
        carburant: selectedVehicule.carburant,
        color: selectedVehicule.color,
        marque_id: selectedVehicule.marque_id,
        category_id: selectedVehicule.category_id,
        status: selectedVehicule.status,
        description: selectedVehicule.description,
      });

      if (selectedVehicule.images?.length) {
        const newPreviews = [null, null, null, null];
        selectedVehicule.images.slice(0, 4).forEach((img, i) => {
          newPreviews[i] = img.path || img.url;
        });
        setPreviews(newPreviews);
      }
    }
  }, [selectedVehicule, isEdit, reset]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    const newPreviews = [...previews];

    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    if (newPreviews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }

    newImages[index] = null;
    newPreviews[index] = null;

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    images.filter(Boolean).forEach((img) => formData.append("images[]", img));

    const result = isEdit
      ? await updateVehicule(selectedVehicule.id, formData)
      : await createVehicule(formData);

    if (!result) {
      return;
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          {isEdit ? "Modifier le véhicule" : "Ajouter un véhicule"}
        </h2>
     
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Nom"
                name="nom"
                register={register}
                rules={{ required: "Le nom est requis" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Année"
                name="annee"
                type="number"
                register={register}
                rules={{ required: "L'année est requis" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Prix / jour"
                name="prix_day"
                type="number"
                register={register}
                rules={{ required: "Le prix par jour est requis" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Numéro d'enregistrement"
                name="registration_number"
                register={register}
                rules={{ required: "Le numéro est requis" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Immatriculation"
                name="immatriculation"
                register={register}
                rules={{ required: "L'immatriculation est requise" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Places"
                name="seats"
                type="number"
                register={register}
                rules={{ required: "Le nombre de places est requis" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <SelectInput
                label="Transmission"
                name="transmission"
                options={["manuelle", "automatique"]}
                register={register}
                rules={{ required: "Choisissez une transmission" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <SelectInput
                label="Carburant"
                name="carburant"
                options={["essence", "diesel", "electronique", "hybride"]}
                register={register}
                rules={{ required: "Choisissez un carburant" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <TextInput
                label="Couleur"
                name="color"
                register={register}
                rules={{ required: "La couleur est requise" }}
                frontErrors={frontErrors}
                backErrors={errors}
              />
              <SelectInput
                label="Statut"
                name="status"
                options={["disponible", "loue", "maintenance", "indisponible"]}
                register={register}
                frontErrors={frontErrors}
                backErrors={errors}
              />
            </div>

            <SelectInput
              label="Marque"
              name="marque_id"
              options={brands}
              isObject
              register={register}
              rules={{ required: "Choisissez une marque" }}
              frontErrors={frontErrors}
              backErrors={errors}
            />
            <SelectInput
              label="Catégorie"
              name="category_id"
              options={categories}
              isObject
              register={register}
              rules={{ required: "Choisissez une catégorie" }}
              frontErrors={frontErrors}
              backErrors={errors}
            />

            <TextareaInput
              label="Description"
              name="description"
              register={register}
              backErrors={errors}
            />

            <div>
              <label className="font-semibold mb-2 block">Images</label>
              <div className="flex gap-4 flex-wrap">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <label className="w-32 h-32 border-2 border-dashed flex items-center justify-center rounded-md cursor-pointer">
                      {previews[i] ? (
                        <img
                          src={previews[i]}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <FaCloudUploadAlt className="text-teal-500 text-2xl" />
                      )}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, i)}
                      />
                    </label>
                    {previews[i] && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 border py-3 rounded-md"
              >
                Annuler
              </button>
              <button
                type="submit"
                
                className="w-1/2 bg-teal-600 text-white py-3 rounded-md"
              >
                Valider
              </button>
            </div>
          </form>
        
      </div>
    </div>
  );
}
