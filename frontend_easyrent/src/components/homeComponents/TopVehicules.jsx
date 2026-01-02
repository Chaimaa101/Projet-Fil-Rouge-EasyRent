import React, { useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import VehicleCard from '../vehiculesListComponents/VehiculeCard';
import { VehiculeContext } from '../../Context/VehiculeProvider';

function TopVehicules() {
  const { getTopVehicules, topvehicules } = useContext(VehiculeContext);

  useEffect(() => {
    getTopVehicules();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 p-10 pl-10 bg-gray-50">
      <h2 className="text-2xl font-bold my-4 flex items-center justify-center gap-2 ">
         Top Véhicules 
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='mx-5'
      >
        {topvehicules.map((vehicule) => (
          <SwiperSlide key={vehicule.id}>
            <VehicleCard vehicule={vehicule} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopVehicules;
