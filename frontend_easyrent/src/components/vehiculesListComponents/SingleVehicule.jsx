import { useContext, useEffect } from "react";
import {
  FaCogs,
  FaGasPump,
  FaDoorOpen,
  FaSnowflake,
  FaUsers,
  FaRoad,
} from "react-icons/fa";
import { VehiculeContext } from "../../Context/VehiculeProvider";
import { useParams } from "react-router-dom";

export default function VehicleDetails() {
  const {id} = useParams()

  const { vehicule, getVehicule } = useContext(VehiculeContext);
useEffect(() => {
    getVehicule(id);
  }, []);


  return (
    <section className="bg-blue-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-10">
          Vehicle Details
        </h1>

        <div className="bg-white rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-lg font-semibold mb-1">{vehicule?.marque?.nom}</h2>
            <p className="text-teal-500 font-bold mb-4">
              {vehicule?.prix_day}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>

            {/* Car Image */}
            <div className="flex justify-center mb-6">
              <img src={vehicule?.images[0]?.path} alt="BMW" className="h-40 object-contain" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {vehicule?.images.map((img) => (
                <div
                  key={img?.id}
                  className="w-16 h-12 bg-gray-200 rounded-md"
                >
                  <img src={img?.path} alt="image" />
                </div>
              ))}
          </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h3 className="font-semibold mb-4">Technical Specification</h3>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <Spec icon={<FaCogs />} label='dgvdbb' value={vehicule?.transmission} />
              <Spec icon={<FaGasPump />} label="Fuel" value={vehicule?.carburant} />
              <Spec icon={<FaDoorOpen />} label="Doors" value="2" />
              <Spec
                icon={<FaSnowflake />}
                label="Air Conditioner"
                value="Yes"
              />
              <Spec icon={<FaUsers />} label={vehicule?.seats} value={vehicule?.seats} />
              <Spec icon={<FaRoad />} label="Distance" value="500" />
            </div>

            {/* Rent Button */}
            <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition mb-8">
              Rent a car
            </button>

            {/* Equipment */}
            <h3 className="font-semibold mb-3">Car Equipment</h3>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <Equipment text="ABS" />
              <Equipment text="Air Bags" />
              <Equipment text="Cruise Control" />
              <Equipment text="Air Conditioner" />
            </div>
            <p>{vehicule?.description}</p>
            <p>{vehicule?.statut}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable components */
const Spec = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
    <span className="text-teal-500">{icon}</span>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-700">{value}</p>
    </div>
  </div>
);

const Equipment = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
    <span>{text}</span>
  </div>
);
