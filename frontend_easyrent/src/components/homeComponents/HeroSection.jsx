import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HeroSection() {
  const slides = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

  return (
    <section className=" w-full h-[70vh] flex items-center justify-center overflow-hidden mb-6">
      {/* Background Swiper */}
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="absolute top-0 left-0 w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Foreground Content */}
      <motion.div
        className=" relative z-10 text-center w-full h-full lg:text-left px-10 bg-gradient-to-b from-[#71C9CE] to-[#CBF1F5]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className=" mt-10 text-5xl lg:text-6xl font-extrabold text-neutral-200 leading-tight">
          Louez la voiture avec  <span className="text-teal-800">EasyRent</span>
        </h1>
        <p className="mt-6 text-gray-700 max-w-xl mx-auto lg:mx-0">
          Des véhicules modernes, des prix compétitifs 
Une réservation rapide en quelques clics.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/vehicles" className="px-6 py-3 bg-teal-700 rounded-xl text-white">
            Reserver maintenant
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-teal-500 rounded-xl text-teal-500"
          >
            Contact Nous
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
