import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useContext, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/css";

import { AvisContext } from "../../Context/AvisProvider";

export default function Testimonials() {
  const { publicAvis = [], getPublicAvis } = useContext(AvisContext);

  useEffect(() => {
    getPublicAvis();
  }, []);

  if (!publicAvis.length) return null;

  return (
    <section className="py-14 bg-blue-100">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto px-4"
      >
        {publicAvis.map((avis) => (
          <SwiperSlide key={avis.id} className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center hover:shadow-xl transition">

              <div className="flex justify-center mb-4">
                <FaQuoteLeft className="text-teal-500 text-3xl" />
              </div>

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

              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                {avis.avis}
              </p>

              <div className="flex justify-center mb-3">
                <img
                  src={avis?.user?.details?.photo_profile || "/profile.jpg"}
                  alt={`${avis?.user?.nom} avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-md"
                />
              </div>

              <div className="bg-teal-500 text-white rounded-lg py-2 px-4 inline-block">
                <p className="font-semibold text-sm">
                  {avis?.user?.nom} {avis?.user?.prenom}
                </p>
                <p className="text-xs opacity-90 capitalize">
                  {avis?.user?.role}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
