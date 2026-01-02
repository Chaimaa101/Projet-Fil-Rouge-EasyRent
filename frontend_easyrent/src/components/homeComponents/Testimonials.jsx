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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Section title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Avis de nos clients
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Découvrez ce que nos clients pensent de notre service de location
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="grid grid-cols-3 gap-2 "
      >
        {publicAvis.map((avis) => (
          <SwiperSlide key={avis.id} className="flex justify-center">
            <div className="relative bg-white rounded-3xl shadow-md p-6 ml-3  max-w-sm hover:shadow-xl transition-all duration-300">

              <div className="absolute left-6 bg-teal-500 text-white p-3 rounded-full shadow-lg">
                <FaQuoteLeft className="text-lg" />
              </div>

              <div className="flex justify-center gap-1 mb-4 mt-6">
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

              <p className="text-gray-600 text-sm leading-relaxed text-center mb-6 line-clamp-4">
                “{avis.avis}”
              </p>

              <div className="flex flex-col items-center">
                <img
                  src={avis?.user?.details?.photo_profile || "/profile.jpg"}
                  alt={`${avis?.user?.nom}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-md mb-2"
                />

                <p className="font-semibold text-gray-800 text-sm">
                  {avis?.user?.nom} {avis?.user?.prenom}
                </p>

                <span className="text-xs text-teal-600 capitalize">
                  {avis?.user?.role}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
