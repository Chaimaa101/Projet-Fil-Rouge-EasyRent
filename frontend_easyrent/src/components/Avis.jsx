import React from "react";
import { motion } from "framer-motion"


function Avis() {
  return (
    <>
      <section className="px-10 py-20 bg-black/30">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["John Doe", "Sarah Ali", "Mohamed R."].map((user) => (
            <motion.div
              key={user}
              whileHover={{ y: -5 }}
              className="bg-white/10 p-6 rounded-2xl backdrop-blur-xl"
            >
              <p className="text-gray-300 mb-4">
                "Amazing service, clean cars and friendly staff. Highly
                recommended!"
              </p>
              <h4 className="font-semibold">{user}</h4>
              <span className="text-blue-400">★★★★★</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Avis;
