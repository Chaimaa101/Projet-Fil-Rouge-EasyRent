/* eslint-disable react/prop-types */
import Cards from "../cartProducts/Cards";
import AppLayout from '@/Pages/AppLayout';

// eslint-disable-next-line react/prop-types
const ProductList = ({
  filteredProducts,
  sortOption,
  setSortOption,
  category,
}) => {
  return (
    <div className="lg:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-medium text-gray-700">
          {filteredProducts.length}
          {filteredProducts.length === 1 ? " Product" : " Products"}
        </p>
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:border-gray-400"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
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
      </div>
      <Cards filteredItems={filteredProducts} category={category} />
    </div>
  );
};

ProductList.layout = page => <AppLayout>{page}</AppLayout>;
export default ProductList;
