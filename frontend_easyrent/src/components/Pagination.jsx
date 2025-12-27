import { motion } from "framer-motion";

function Pagination({ currentPage, lastPage, onPageChange }) {
  if (!lastPage) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-lg border text-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-gray-100 transition"
      >
        Prev
      </motion.button>

      {Array.from({ length: lastPage }).map((_, index) => {
        const page = index + 1;
        return (
          <motion.button
            key={page}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg text-sm transition
              ${
                currentPage === page
                  ? "bg-teal-600 text-white shadow-md"
                  : "border hover:bg-gray-100"
              }`}
          >
            {page}
          </motion.button>
        );
      })}

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-lg border text-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-gray-100 transition"
      >
        Next
      </motion.button>
    </div>
  );
}

export default Pagination;
