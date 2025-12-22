/* eslint-disable react/prop-types */
const FilterSection = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  colorFilter,
  setColorFilter,
  priceRange,
  setPriceRange,
  resetFilters,
}) => {
  const getRingColor = (color) => {
    switch (color.toLowerCase()) {
      case "black":
        return "#000000";
      case "brown":
        return "#964B00";
      case "clear":
        return "#F0F0F0";
      case "green":
        return "#008000";
      case "blue":
        return "#0000FF";
      case "red":
        return "#FF0000";
      default:
        return "#3B82F6"; // Default ring color
    }
  };

  return (
    <div className="lg:w-1/4 bg-gray-100 p-6 rounded-xl shadow-lg lg:sticky lg:top-[5.5rem] lg:h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

      {/* Search Input */}
      <div className="mb-6">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products.."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <div className="relative">
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Case">Case</option>
            <option value="Chain">Chain</option>
            <option value="Face Accessory">Face Accessory</option>
            <option value="Ear Grips">Ear Grips</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Color
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["Black", "Brown", "Clear", "Green", "Blue", "red"].map((color) => (
            <button
              key={color}
              onClick={() => setColorFilter(color)}
              className={`p-2 rounded-lg border transition-all ${
                colorFilter === color
                  ? "border-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{
                backgroundColor: color.toLowerCase(),
                boxShadow:
                  colorFilter === color
                    ? `0 0 0 2px ${getRingColor(color)}`
                    : "none",
              }}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label
          htmlFor="price-range"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Price Range
        </label>
        <input
          type="range"
          step="50"
          min="0"
          max="2000"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${
              (priceRange / 2000) * 100
            }%, #d1d5db ${(priceRange / 2000) * 100}%)`,
          }}
        />
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <span className="font-medium">0dh</span>
          <span className="font-semibold">{priceRange}dh</span>
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
