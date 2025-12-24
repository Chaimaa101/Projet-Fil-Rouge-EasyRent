import { usePageInView } from "framer-motion";
import { FaUsers, FaCogs, FaGasPump } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function vehiculeCard({ vehicule }) {
  console.log(vehicule?.images
  )
  return (
    <div className="bg-white max-w-80 rounded-xl shadow-md p-5 hover:shadow-lg transition">
      {/* Image */}
      <div className="h-32 flex items-center justify-center mb-4">
        <img
          src={vehicule?.images[0]?.path}
          alt={vehicule?.marque?.nom}
          className="object-contain h-full"
        />
      </div>

      {/* Title & Price */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">
          {vehicule?.marque?.nom}
        </h3>
        <span className="text-teal-500 font-bold">
          ${vehicule?.prix_day}
          <span className="text-sm font-normal text-gray-400">
            /day
          </span>
        </span>
      </div>

      {/* Features */}
      <div className="flex justify-between text-gray-500 text-sm my-4">
        <div className="flex items-center gap-1">
          <FaUsers /> {vehicule?.seats}
        </div>
        <div className="flex items-center gap-1">
          <FaGasPump /> {vehicule?.carburant}
        </div>
        <div className="flex items-center gap-1">
          <FaCogs /> {vehicule?.transmission}
        </div>
      </div>

      {/* Button */}
      <Link to={`vehicule/${vehicule?.id}`} className=" bg-teal-500 text-white p-3 mt-2 rounded-lg hover:bg-teal-600 transition ">
        View Details
      </Link>
    </div>
  );
}
