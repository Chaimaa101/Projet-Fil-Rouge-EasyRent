// FilterSection.jsx
import React from 'react';

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
  typeFilter,
  setTypeFilter,
  yearFilter,
  setYearFilter,
  seatsFilter,
  setSeatsFilter,
  resetFilters,
  brands = [], 
  colors = [], 
  years = [], 
  transmissions = ["Manuelle", "Automatique"],
  fuels = ["Essence", "Diesel", "Électrique", "Hybride"],
  types = ["Voiture", "SUV", "Camionnette", "Moto"],
  seatsOptions = [2, 4, 5, 7, 9]
}) => {
  return (
    <div className="lg:w-1/4 w-full bg-gray-50 p-4 rounded-lg shadow-md h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtres</h2>
        
        {/* Search */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nom ou immatriculation..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Brand Filter */}
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
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
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

        {/* Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type de véhicule
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Tous les types</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission Filter */}
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

        {/* Fuel Type Filter */}
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

        {/* Year Filter */}
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

        {/* Seats Filter */}
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

        {/* Price Range */}
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
            <span>500DH</span>
          </div>
        </div>

        {/* Reset Filters Button */}
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