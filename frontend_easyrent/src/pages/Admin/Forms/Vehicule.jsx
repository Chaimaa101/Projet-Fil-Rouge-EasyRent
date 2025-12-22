import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaCalendarAlt, 
  FaPalette, 
  FaMoneyBillAlt, 
  FaFileAlt,
  FaKey,
  FaChair,
  FaCog,
  FaGasPump,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSave
} from 'react-icons/fa';
import { GiCarDoor } from 'react-icons/gi';

const VehiculeForm = () => {
  const [formData, setFormData] = useState({
    marque_id: '',
    nom: '',
    annee: new Date().getFullYear(),
    color: '',
    prix_day: '',
    description: '',
    registration_number: '',
    seats: 5,
    transmission: 'automatic',
    carburant: 'petrol',
    statut: 'available',
    immatriculation: '',
    type: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
}

const handleSubmit = () =>{
    console.log(formData)
}

  return (
    <>
    
            {/* ADD FORM */}
            {showFormAdd && (
                <>
                    <div
                        onClick={() => setShowFormAdd(false)}
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-[100] cursor-pointer flex items-center justify-center"
                    ></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16 w-full max-w-2xl transition-all duration-500 z-[10000] text-black">
                        <div className="mx-auto bg-white rounded-lg shadow-xl p-4 h-[87vh] overflow-y-scroll scrollbar-style">
                            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4 text-center">
                                Add Product
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Image Upload Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Product Images
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square rounded-xl overflow-hidden group"
                                            >
                                                {images[index] ? (
                                                    <div className="relative w-full">
                                                        <img
                                                            src={
                                                                typeof images[
                                                                    index
                                                                ] === "string"
                                                                    ? images[
                                                                          index
                                                                      ]
                                                                    : URL.createObjectURL(
                                                                          images[
                                                                              index
                                                                          ]
                                                                      )
                                                            }
                                                            alt={`Product ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeImage(
                                                                    index
                                                                )
                                                            }
                                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <IoClose className="w-4 h-4" />
                                                        </button>
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <label
                                                                htmlFor={`image${index}`}
                                                                className="cursor-pointer"
                                                            >
                                                                <span className="text-white text-sm font-medium">
                                                                    Change Image
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor={`image${index}`}
                                                        className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors cursor-pointer group"
                                                    >
                                                        <CiImageOn className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                        <span className="text-center mt-2 text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                                                            Upload Image
                                                        </span>
                                                    </label>
                                                )}
                                                <input
                                                    type="file"
                                                    id={`image${index}`}
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="space-y-2">
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Product Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product title"
                                            required
                                            value={data.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Price
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                    value={data.price}
                                                    onChange={handleChange}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    DH
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="category_id"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Category
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.category_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Category
                                                </option>
                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label
                                                htmlFor="brand_id"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Brand
                                            </label>
                                            <select
                                                id="brand_id"
                                                name="brand_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.brand_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Brand
                                                </option>
                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="color"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                id="color"
                                                name="color"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="e.g., Blue"
                                                required
                                                value={data.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="quantity"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="Quantity"
                                                required
                                                value={data.quantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="4"
                                            className="w-full resize-none px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product description..."
                                            required
                                            value={data.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Status
                                        </label>
                                        <div className="flex justify-center md:justify-between flex-wrap gap-6">
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="inStock"
                                                    checked={data.inStock}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Available
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isNew"
                                                    checked={data.isNew}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    New Product
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="sold"
                                                    checked={data.sold}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Sold Out
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                >
                                    {processing ? "Adding..." : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}

 
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
 
        <div  className="mb-8 text-center">
         
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ajouter un Véhicule</h1>
          <p className="text-gray-600">Remplissez le formulaire pour ajouter un nouveau véhicule à la flotte</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaCar className="mr-2 text-blue-500" />
                Nom du véhicule *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Toyota Camry 2023"
              />
              { errors.nom && (
                <p className="text-red-500 text-sm">{errors.nom}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Année *
              </label>
              <input
                type="number"
                name="annee"
                value={formData.annee}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.annee ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              { errors.annee && (
                <p className="text-red-500 text-sm">{errors.annee}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaPalette className="mr-2 text-blue-500" />
                Couleur *
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.color ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez une couleur</option>
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaMoneyBillAlt className="mr-2 text-blue-500" />
                Prix journalier (€) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  name="prix_day"
                  value={formData.prix_day}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                     errors.prix_day ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              { errors.prix_day && (
                <p className="text-red-500 text-sm">{errors.prix_day}</p>
              )}
            </div>

            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <GiCarDoor className="mr-2 text-blue-500" />
                Type de véhicule *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez un type</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              { errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>

            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaChair className="mr-2 text-blue-500" />
                Nombre de sièges *
              </label>
              <div className="flex items-center space-x-4">
                <input type="text" />
              </div>
            </div>


            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaCog className="mr-2 text-blue-500" />
                Transmission *
              </label>
             <select name="" id="">
                <option value=""></option>
             </select>
            </div>

       
            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaGasPump className="mr-2 text-blue-500" />
                Carburant *
              </label>
             <select name="" id=""><option value=""></option></select>
            </div>

     
            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaCheckCircle className="mr-2 text-blue-500" />
                Statut *
              </label>
                          <select name="" id=""><option value=""></option></select>

            </div>

            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaKey className="mr-2 text-blue-500" />
                Numéro d'immatriculation *
              </label>
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.registration_number ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: AB-123-CD"
              />
              { errors.registration_number && (
                <p className="text-red-500 text-sm">{errors.registration_number}</p>
              )}
            </div>

            <div  className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaFileAlt className="mr-2 text-blue-500" />
                Plaque d'immatriculation *
              </label>
              <input
                type="text"
                name="immatriculation"
                value={formData.immatriculation}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                   errors.immatriculation ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: 123ABC456"
              />
              { errors.immatriculation && (
                <p className="text-red-500 text-sm">{errors.immatriculation}</p>
              )}
            </div>
          </div>

          <div  className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaFileAlt className="mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Description du véhicule (équipements, état, particularités...)"
            />
          </div>

          <div  className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Ajouter le véhicule
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
       </>
  );
};

export default VehiculeForm;