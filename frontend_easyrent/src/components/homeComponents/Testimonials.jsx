
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useContext, useEffect, useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";
import { AvisContext } from "../../Context/AvisProvider";

export default function Testimonials() {
   const { avis, getAvis } = useContext(AvisContext);
  
    useEffect(() => {
      getAvis();
    }, []);

  return (
    <div
      className="py-12 bg-blue-100"
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
        className="max-w-7xl mx-auto px-4"
      >
        {avis.map((avis) => (
          <SwiperSlide key={avis.id} className="flex justify-center">
            <div className="bg-white rounded-xl shadow-md p-6 mx-9 text-center w-80 h-65">
    
      <div className="flex justify-center mb-3">
        <FaQuoteLeft className="text-teal-500 text-3xl" />
      </div>

      {/* Stars */}
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-sm ${
              index < avis.rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {avis.avis}
      </p>

<div className="">
  <img src="" alt="" />
</div>
      <div className="bg-teal-500 text-white rounded-lg py-2 px-4 inline-block">
        <p className="font-semibold text-sm">{avis.user.nom} {avis.user.prenom}</p>
        <p className="text-xs opacity-90">{avis.user.role}</p>
      </div>
    </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
