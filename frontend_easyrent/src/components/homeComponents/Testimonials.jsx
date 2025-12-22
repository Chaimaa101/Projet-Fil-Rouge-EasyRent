import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { AvisContext } from "../../Context/AvisProvider";


const testimonials = [
  {
    name: "Alice Dupont",
    role: "CEO, Company A",
    message: "This service is amazing! Highly recommend it.",
    avatar: "/avatars/alice.jpg",
  },
  {
    name: "Jean Martin",
    role: "Developer",
    message: "The team is professional and the product is excellent.",
    avatar: "/avatars/jean.jpg",
  },
  {
    name: "Sophie Lambert",
    role: "Designer",
    message: "I loved working with them! Fast and reliable.",
    avatar: "/avatars/sophie.jpg",
  },
  ,
  {
    name: "Sophie Lambert",
    role: "Designer",
    message: "I loved working with them! Fast and reliable.",
    avatar: "/avatars/sophie.jpg",
  },,
  {
    name: "Sophie Lambert",
    role: "Designer",
    message: "I loved working with them! Fast and reliable.",
    avatar: "/avatars/sophie.jpg",
  },,
  {
    name: "Sophie Lambert",
    role: "Designer",
    message: "I loved working with them! Fast and reliable.",
    avatar: "/avatars/sophie.jpg",
  },
];

export default function Testimonials() {

  const {avis , getAvis} = useContext(AvisContext)
  useEffect(() =>{
    getAvis()
  },[])
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {avis.map((testi, index) => (
          <SwiperSlide key={index}>
            <motion.div
            key={testi.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl mb-4 shadow-lg flex flex-col items-center text-center transition-transform duration-300"
            >
              <img
                src="/profile.png"
                alt={testi.user.nom}
                className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-blue-500"
              />
              <p className="text-white mb-3 italic">"{testi.avis}"</p>
              <h3 className="text-lg font-bold text-white">{testi.user.nom} {testi.user.prenom}</h3>
              <span className="text-sm text-gray-300">{testi.user.role}</span>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
