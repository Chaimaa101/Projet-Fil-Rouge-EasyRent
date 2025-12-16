import React from "react";
import { motion } from "framer-motion"

function ListVehicules() {
  return (
    <>
      <section className="px-10 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Top Vehicles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["BMW X5", "Mercedes AMG", "Audi A6"].map((car) => (
            <motion.div
              key={car}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-6 rounded-2xl backdrop-blur-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                alt={car}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{car}</h3>
              <p className="text-gray-300">From $80 / day</p>
              <button className="mt-4 w-full bg-blue-600 py-2 rounded-lg">
                Rent Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ListVehicules;
