import React from "react";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <section className="relative px-10 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Enjoy your holidays with{" "}
            <span className="text-blue-500">our wheels</span>
          </h1>
          <p className="mt-6 text-gray-300 max-w-xl">
            Premium car rental service with comfort, safety, and unbeatable
            prices.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/vehicles" className="px-6 py-3 bg-blue-600 rounded-xl">
              Reserver maintenant
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border border-blue-500 rounded-xl"
            >
              Contact Nous
            </Link>
          </div>
        </motion.div><div className="relative">

  <motion.img
    src="src/assets/hero.png"
    alt="car"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  />

  <motion.span
    className="absolute top-[50%] left-[26%] w-10 h-9 rounded-full"
    initial={{ opacity: 0.5 }}
    animate={{ 
      backgroundColor: ["#3b82f6", "#dbeafe", "#3b82f6"], 
      opacity: [0.3, 1, 0.3],
      boxShadow: [
        "0 0 5px #3b82f6",
        "0 0 10px #dbeafe",
        "0 0 5px #3b82f6"
      ]
    }}
    transition={{ duration: 1, repeat: Infinity }}
  ></motion.span>


  <motion.span
    className="absolute top-[50%] right-[26%] w-10 h-9 rounded-full"
    initial={{ opacity: 0.5 }}
    animate={{ 
      backgroundColor: ["#3b82f6", "#dbeafe", "#3b82f6"], 
      opacity: [0.3, 1, 0.3],
      boxShadow: [
        "0 0 5px #3b82f6",
        "0 0 10px #dbeafe",
        "0 0 5px #3b82f6"
      ]
    }}
    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
  ></motion.span>
</div>

      </section>
    </>
  );
}

export default HeroSection;
