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
import GlobalLoader from './../../../components/common/GlobalLoader';

export default function VehiculeForm({ isEdit = false }) {
  const { createVehicule, updateVehicule, vehicule, getVehicule, errors,loading } =
    useContext(VehiculeContext);

  const { brands, categories, getBrands, getCategories } =
    useContext(BrandContext);

  const { id } = useParams();
  const navigate = useNavigate();


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

    if (isEdit) {
      getVehicule(id);
    }
  }, []);

  useEffect(() => {
    if (isEdit && vehicule) {
      reset({
        nom: vehicule.nom,
        annee: vehicule.annee,
        prix_day: vehicule.prix_day,
        registration_number: vehicule.registration_number,
        immatriculation: vehicule.immatriculation,
        seats: vehicule.seats,
        transmission: vehicule.transmission,
        carburant: vehicule.carburant,
        color: vehicule.color,
        marque_id: vehicule.marque_id,
        category_id: vehicule.category_id,
        description: vehicule.description,
      });

      if (vehicule.images?.length) {
        const newPreviews = [...previews];
        vehicule.images.slice(0, 4).forEach((img, i) => {
          newPreviews[i] = typeof img === "string" ? img : img.url;
        });
        setPreviews(newPreviews);
      }
    }
  }, [vehicule]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    const newPreviews = [...previews];

    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImages(newImages);
    setPreviews(newPreviews);
    setValue(`images[${index}]`, file);
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
    try {
    
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      images.filter(Boolean).forEach((img) => {
        formData.append("images[]", img);
      });

      const result = isEdit
        ? await updateVehicule(id, formData)
        : await createVehicule(formData);

      if (!result) {
        toast.error("Erreur lors de l'enregistrement");
      } else {
        navigate("/admin/vehicules");
      }
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        {isEdit ? "Modifier le véhicule" : "Ajouter un véhicule"}
      </h2>
         {loading ?(
        <GlobalLoader/>
      ):(
        
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
            backErrors={errors}
            frontErrors={frontErrors}
          />
          <TextInput
            label="Prix / jour"
            name="prix_day"
            type="number"
            register={register}
            rules={{ required: "Le prix par jour  est requis" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />
          <TextInput
            label="Numéro f'enregistrement"
            name="registration_number"
            register={register}
            rules={{ required: "Le Numéro f'enregistrement est requis" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />
          <TextInput
            label="Immatriculation"
            name="immatriculation"
            register={register}
            rules={{ required: "L'Immatriculation nom est requis" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />
          <TextInput
            label="Places"
            name="seats"
            type="number"
            register={register}
            rules={{ required: "Le nomre des places nom est requis" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />

          <SelectInput
            label="Transmission"
            name="transmission"
            options={["manuelle", "automatique"]}
            register={register}
            rules={{ required: "Choisissez une Transmission" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />

          <SelectInput
            label="Carburant"
            name="carburant"
            options={["essence", "diesel", "electronique", "hybride"]}
            register={register}
            rules={{ required: "Choisissez Carburant" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />

          <TextInput
            label="Couleur"
            name="color"
            register={register}
            rules={{ required: "Le couleur est requis" }}
            backErrors={errors}
            frontErrors={frontErrors}
          />

          <SelectInput
            label="Statut"
            name="status"
            options={["disponible", "loue", "maintenance", "indisponible"]}
            register={register}
            backErrors={errors}
            frontErrors={frontErrors}
          />
        </div>

        <SelectInput
          label="Marque"
          name="marque_id"
          options={brands}
          isObject
          register={register}
          rules={{ required: "Choisissez une marque" }}
          backErrors={errors}
          frontErrors={frontErrors}
        />

        <SelectInput
          label="Catégorie"
          name="category_id"
          options={categories}
          isObject
          register={register}
          rules={{ required: "Choisissez une Catégorie" }}
          backErrors={errors}
          frontErrors={frontErrors}
        />

        <TextareaInput
          label="Description"
          name="description"
          register={register}
          backErrors={errors}
        />

        {/* Images */}
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

          {errors?.images && (
            <p className="text-red-500 text-sm mt-2">{errors.images[0]}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 border py-3 rounded-md"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-teal-600 text-white py-3 rounded-md"
          >
            {loading ? "Enregistrement..." : "Valider"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
