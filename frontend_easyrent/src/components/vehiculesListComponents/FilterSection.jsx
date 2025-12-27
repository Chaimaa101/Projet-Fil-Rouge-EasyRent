import React, { useContext, useEffect } from 'react';
import { BrandContext } from '../../Context/BrandProvider';

const FilterSection = ({
  searchQuery,
  setSearchQuery,
  brandFilter,
  setBrandFilter,
  colorFilter,
  setColorFilter,
  priceRange,
  setPriceRange,
  transmissionFilter,
  setTransmissionFilter,
  fuelFilter,
  setFuelFilter,
  categoryFilter,
  setcategoryFilter,
  yearFilter,
  setYearFilter,
  seatsFilter,
  setSeatsFilter,
  resetFilters,
  colors = [], 
  years = [], 
  transmissions = ["Manuelle", "Automatique"],
  fuels = ["Essence", "Diesel", "Électrique", "Hybride"],
  seatsOptions = [2, 4, 5, 7, 9]
}) => {
  const {categories,brands,getBrands,getCategories}= useContext(BrandContext)

  useEffect(() =>{
    getBrands()
    getCategories()
  },[])
  return (
    <div className="lg:w-1/4 w-full bg-gray-50 p-4 rounded-lg shadow-md h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtres</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            category="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nom ou immatriculation..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marque
          </label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couleur
          </label>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes les couleurs</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categorie de véhicule
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setcategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous les categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transmission
          </label>
          <select
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes</option>
            {transmissions.map((trans, index) => (
              <option key={index} value={trans}>
                {trans}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carburant
          </label>
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous</option>
            {fuels.map((fuel, index) => (
              <option key={index} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Année
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes les années</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de places
          </label>
          <select
            value={seatsFilter}
            onChange={(e) => setSeatsFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Toutes</option>
            {seatsOptions.map((seat, index) => (
              <option key={index} value={seat}>
                {seat} places
              </option>
            ))}
          </select>
        </div>


        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix max par jour: {priceRange}DH
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50DH</span>
            <span>900DH</span>
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
};

export default FilterSection;