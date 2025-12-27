import { useContext, useEffect } from "react";
import { useState } from "react";
import { VehiculeContext } from "../Context/VehiculeProvider";
import GlobalLoader from "../components/common/GlobalLoader";
import VehiculeList from "../components/vehiculesListComponents/VehiculesList";
import FilterSection from "../components/vehiculesListComponents/FilterSection";
import Pagination from "../components/Pagination";

const ListVehicules = () => {
  const [filteredVehicules, setFilteredVehicules] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [brandFilter, setBrandFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [transmissionFilter, setTransmissionFilter] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [categoryFilter, setcategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [seatsFilter, setSeatsFilter] = useState("");

  const { vehicules, getVehicules, loading, errors,pagination ,total} =
    useContext(VehiculeContext);

 useEffect(() => {
  getVehicules(1, {
    search: searchQuery,
    brand: brandFilter,
    color: colorFilter,
    price: priceRange,
    transmission: transmissionFilter,
    fuel: fuelFilter,
    category: categoryFilter,
    year: yearFilter,
    seats: seatsFilter,
    sort: sortOption,
  });
}, [
  searchQuery,
  brandFilter,
  colorFilter,
  priceRange,
  transmissionFilter,
  fuelFilter,
  categoryFilter,
  yearFilter,
  seatsFilter,
  sortOption,
]);

  useEffect(() => {
    let filteredData = [...vehicules];
    
    
    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.immatriculation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Brand filter
    if (brandFilter) {
      filteredData = filteredData.filter((item) =>
        item.marque.nom && item.marque.nom.toString() === brandFilter
      );
    }
    
    // Color filter
    if (colorFilter) {
      filteredData = filteredData.filter((item) =>
        item.color && item.color.toLowerCase().includes(colorFilter.toLowerCase())
      );
    }
    
    // Transmission filter
    if (transmissionFilter) {
      filteredData = filteredData.filter((item) =>
        item.transmission && item.transmission.toLowerCase() === transmissionFilter.toLowerCase()
      );
    }
    
    // Fuel type filter
    if (fuelFilter) {
      filteredData = filteredData.filter((item) =>
        item.carburant && item.carburant.toLowerCase() === fuelFilter.toLowerCase()
      );
    }
    
   
    if (categoryFilter) {
      filteredData = filteredData.filter((item) =>
        item.category.nom && item.category.nom.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Year filter
    if (yearFilter) {
      filteredData = filteredData.filter((item) =>
        item.annee && item.annee.toString() === yearFilter
      );
    }
    
    // Seats filter
    if (seatsFilter) {
      filteredData = filteredData.filter((item) =>
        item.seats && item.seats.toString() === seatsFilter
      );
    }
    
    // Price range filter
    filteredData = filteredData.filter((item) => 
      item.prix_day && item.prix_day <= priceRange
    );

    // Sorting
    switch (sortOption) {
      case "A-Z":
        filteredData.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case "Z-A":
        filteredData.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
      case "low-to-high":
        filteredData.sort((a, b) => a.prix_day - b.prix_day);
        break;
      case "high-to-low":
        filteredData.sort((a, b) => b.prix_day - a.prix_day);
        break;
      case "newest":
        filteredData.sort((a, b) => b.annee - a.annee);
        break;
      case "oldest":
        filteredData.sort((a, b) => a.annee - b.annee);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredVehicules(filteredData);
  }, [
    searchQuery,
    colorFilter,
    brandFilter,
    priceRange,
    sortOption,
    vehicules,
    transmissionFilter,
    fuelFilter,
    categoryFilter,
    yearFilter,
    seatsFilter,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setBrandFilter("");
    setColorFilter("");
    setPriceRange(2000);
    setTransmissionFilter("");
    setFuelFilter("");
    setcategoryFilter("");
    setYearFilter("");
    setSeatsFilter("");
    setSortOption("default");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-4xl font-bold italic uppercase text-center text-gray-900 my-12">
        Véhicules Disponibles
      </h1>
      <div className="flex flex-col lg:flex-row gap-4 relative">
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          brandFilter={brandFilter}
          setBrandFilter={setBrandFilter}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          transmissionFilter={transmissionFilter}
          setTransmissionFilter={setTransmissionFilter}
          fuelFilter={fuelFilter}
          setFuelFilter={setFuelFilter}
          categoryFilter={categoryFilter}
          setcategoryFilter={setcategoryFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          seatsFilter={seatsFilter}
          setSeatsFilter={setSeatsFilter}
          resetFilters={resetFilters}
        />
        {loading ? (
          <GlobalLoader />
        ) : (
          <VehiculeList
            filteredVehicules={filteredVehicules.length > 0 ? filteredVehicules : vehicules}
            sortOption={sortOption}
            setSortOption={setSortOption}
            totalVehicules={filteredVehicules.length}
            allVehiculesCount={total}
          />
        )}
      </div>
      <Pagination currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={(page) => getVehicules(page)}
          />
      
      {/* Show message when filters are applied
      {filteredVehicules.length !== vehicules.length && (
        <div className="mt-4 text-center text-gray-600">
          <p>
            Affichage de {filteredVehicules.length} véhicules sur {vehicules.length} 
            {filteredVehicules.length === 0 && " - Aucun véhicule ne correspond aux critères"}
          </p>
        </div>
      )}*/}
    </div> 
  );
};

export default ListVehicules;