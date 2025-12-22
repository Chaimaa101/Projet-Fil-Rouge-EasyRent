import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HeroSection() {
  const slides = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
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

      {/* Overlay to darken the background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 text-center lg:text-left px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Enjoy your holidays with <span className="text-blue-500">our wheels</span>
        </h1>
        <p className="mt-6 text-gray-200 max-w-xl mx-auto lg:mx-0">
          Premium car rental service with comfort, safety, and unbeatable prices.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/vehicles" className="px-6 py-3 bg-blue-600 rounded-xl">
            Reserver maintenant
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-blue-500 rounded-xl text-white"
          >
            Contact Nous
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
