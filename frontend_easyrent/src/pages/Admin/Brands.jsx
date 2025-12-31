import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { HiOutlineSearch } from "react-icons/hi";
import GlobalLoader from "../../components/common/GlobalLoader";
import PageHeader from "../../components/PageHeader";
import { BrandContext } from "../../Context/BrandProvider";
import { MdSearch } from "react-icons/md";

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
    <div className="flex-1 relative overflow-auto bg-gray-100 text-black p-7 m-12">
      <PageHeader
        title="Gestion des Marques"
        subtitle="Liste et gestion des marques"
        num={brands.length}
      />
       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                  <div className="flex items-center w-full sm:w-1/2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
                    <input type="text" placeholder="Rechercher une marque..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400"/>
                    <MdSearch size={25} className="text-gray-500"/>
                  </div>
                  <motion.button whileTap={{ scale: 0.95 }} className="bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200 w-full sm:w-auto" onClick={() => handleOpenModal()}>NEW Marque</motion.button>
                </motion.div>
      
      {loading && <GlobalLoader />}

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
