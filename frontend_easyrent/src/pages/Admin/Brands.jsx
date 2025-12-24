import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { HiOutlineSearch } from "react-icons/hi";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../../components/PageHeader";
import { BrandContext } from "../../Context/BrandProvider";

export default function Brands() {
  const [searchQuery, setSearchQuery] = useState("");
  const { brands = [], getBrands, loading, deleteBrand } =
    useContext(BrandContext);

  useEffect(() => {
    getBrands();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette marque ?")) {
      deleteBrand(id);
    }
  };

  // Search
  const filteredBrands = brands.filter((brand) =>
    brand.nom?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 relative overflow-auto bg-gray-100 text-black">
      <PageHeader
        title="Gestion des Marques"
        subtitle="Liste et gestion des marques"
        num={brands.length}
      />

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Rechercher une marque..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <HiOutlineSearch
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </motion.div>

      {/* Loader */}
      {loading && <GlobalLoader />}

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        <AnimatePresence>
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              {/* Image */}
              <img
                src={brand.image || "/placeholder.png"}
                alt={brand.nom}
                className="w-full h-30 object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <h3 className="text-xl font-semibold">{brand.nom}</h3>

              {/* Vehicules count */}
              <p className="text-sm text-gray-500 mt-1">
                Véhicules : {brand.vehicules?.length || 0}
              </p>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg"
                >
                  Modifier
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDelete(brand.id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg flex items-center gap-2"
                >
                  <GoTrash size={16} />
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
