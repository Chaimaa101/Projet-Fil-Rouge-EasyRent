import { useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { VehiculeContext } from "../../../Context/VehiculeProvider";
import { BrandContext } from "../../../Context/BrandProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function VehiculeForm({ isEdit = false }) {
  const { createVehicule, updateVehicule, vehicule, getVehicule } =
    useContext(VehiculeContext);
  const { brands, categories, getBrands, getCategories } =
    useContext(BrandContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  /* Charger les marques et catégories */
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
      seats: vehicule.seats,
      transmission: vehicule.transmission,
      carburant: vehicule.carburant,
      color: vehicule.color,
      marque_id: vehicule.marque_id,
      category_id: vehicule.category_id,
      description: vehicule.description,
    });

     if (vehicule?.images && vehicule?.images?.length > 0) {
            const newPreviews = [...previews];
            
            vehicule.images.slice(0, 4).forEach((img, index) => {
              // Si l'image a une URL complète ou relative
              if (typeof img === 'object' && img.url) {
                newPreviews[index] = img.url;
              } else if (typeof img === 'string') {
                newPreviews[index] = img;
              }
            });
            
            setPreviews(newPreviews);
          }
        }
}, [vehicule]);


  /* Gestion du changement d'image */
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

  /* Supprimer une image */
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
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value)
    );

    images.filter(Boolean).forEach((img) => {
      formData.append("images[]", img);
    });

    if (isEdit) {
      await updateVehicule(id, formData);
    
    } else {
      await createVehicule(formData);

    }

    // navigate(-1);
  } catch (e) {
    toast.error("Erreur lors de l'enregistrement");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        {isEdit ? "Modifier le véhicule" : "Ajouter un véhicule"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* GRILLE DE CHAMPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Nom" 
            name="nom" 
            register={register} 
            errors={errors} 
          />
          <Input
            label="Année"
            name="annee"
            type="number"
            register={register}
            errors={errors}
          />
          <Input
            label="Prix / jour"
            name="prix_day"
            type="number"
            register={register}
            errors={errors}
          />
          <Input
            label="Immatriculation"
            name="registration_number"
            register={register}
            errors={errors}
          />
          <Input
            label="Places"
            name="seats"
            type="number"
            register={register}
            errors={errors}
          />
          <Select
            label="Transmission"
            name="transmission"
            options={["manuel", "automatique"]}
            register={register}
            errors={errors}
          />
          <Select
            label="Carburant"
            name="carburant"
            options={["essence", "diesel", "electrique", "hybride"]}
            register={register}
            errors={errors}
          />
          <Input label="Couleur" name="color" register={register} errors={errors} />
        </div>

        <Select
          label="Marque"
          name="marque_id"
          options={brands}
          isObject
          register={register}
          errors={errors}
        />

        <Select
          label="Catégorie"
          name="category_id"
          options={categories}
          isObject
          register={register}
          errors={errors}
        />

        <div>
          <label className="font-semibold mb-2 block">Description</label>
          <textarea
            {...register("description", { required: "Description requise" })}
            placeholder="Description du véhicule..."
            className="input w-full h-32"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* IMAGES */}
        <div>
          <label className="font-semibold mb-2 block">Images du véhicule</label>
          <p className="text-sm text-gray-500 mb-3">
            {isEdit 
              ? "Cliquez sur une image pour la modifier. Les images existantes seront conservées si non modifiées."
              : "Téléchargez jusqu'à 4 images du véhicule"
            }
          </p>
          <div className="flex gap-4 flex-wrap">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  {previews[i] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previews[i]}
                        alt={`Image ${i + 1} du véhicule`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div  />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt className="text-teal-500 text-2xl mb-2" />
                      <span className="text-sm text-gray-500">Image {i + 1}</span>
                    </div>
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
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enregistrement...
              </span>
            ) : isEdit ? "Mettre à jour" : "Ajouter le véhicule"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* COMPOSANT INPUT */
const Input = ({ label, name, type = "text", register, errors }) => (
  <div>
    <label className="font-semibold text-gray-700 mb-1 block">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} est requis` })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      placeholder={`Entrez ${label.toLowerCase()}`}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

/* COMPOSANT SELECT */
const Select = ({
  label,
  name,
  options,
  register,
  errors,
  isObject = false,
}) => (
  <div>
    <label className="font-semibold text-gray-700 mb-1 block">{label}</label>
    <select
      {...register(name, { required: `${label} est requis` })}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    >
      <option value="">Sélectionner une {label.toLowerCase()}</option>
      {options.map((o) =>
        isObject ? (
          <option key={o.id} value={o.id}>
            {o.nom}
          </option>
        ) : (
          <option key={o} value={o}>
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        )
      )}
    </select>
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);