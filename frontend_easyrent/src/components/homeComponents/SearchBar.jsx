import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className=" w-full flex justify-center px-4  mb-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl p-6 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

          {/* Pick-up Location */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Ville ou Aéroport
            </label>
            <div className="flex items-center gap-2 border-2 border-gray-400 rounded-lg px-3 py-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <input
                type="text"
                placeholder="City or Airport"
                className="w-full outline-none text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Pick-up Date */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
            Date de Retrait
            </label>
            <div className="flex items-center gap-2 border-2 border-gray-400  rounded-lg px-3 py-2">
              <FaCalendarAlt className="text-gray-400" />
              <input
                type="date"
                className="w-full outline-none  text-gray-500text-sm"
              />
            </div>
          </div>

          {/* Pick-up Time */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
Heure de Retrait
            </label>
            <div className="flex items-center gap-2 border-2 border-gray-400  rounded-lg px-3 py-2">
              <FaClock className="text-gray-400" />
              <input
                type="time"
                className="w-full outline-none text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Date de Retour
            </label>
            <div className="flex items-center gap-2 border-2 border-gray-400  rounded-lg px-3 py-2">
              <FaCalendarAlt className="text-gray-400" />
              <input
                type="date"
                className="w-full outline-none  text-gray-500text-sm"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-900 text-white rounded-lg px-6 py-3 transition">
            <FaSearch />
           Recherche
          </button>

        </div>
      </div>
    </div>
  );
}
