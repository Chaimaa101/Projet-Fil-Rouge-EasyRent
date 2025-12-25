import { FaWifi, FaSnowflake, FaUsb, FaCar, FaStar } from "react-icons/fa";

export default function CarReservationCard({ reservation }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-teal-100 p-6 m-12 hover:shadow-lg transition">
      
      {/* Car Info */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {reservation?.car_name} • {reservation?.car_model}
          </h2>
          <p className="text-sm text-gray-500">{reservation?.plate_number}</p>
        </div>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <FaStar />
          <span>{reservation?.rating || 5}</span>
        </div>
      </div>

  
      <div className="flex justify-between my-4 text-gray-600 text-sm">
        <div>
          <p className="font-semibold">From:</p>
          <p>{reservation?.start_date}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">To:</p>
          <p>{reservation?.end_date}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {reservation?.facilities.includes("wifi") && <Facility icon={<FaWifi />} label="WiFi" />}
        {reservation?.facilities.includes("ac") && <Facility icon={<FaSnowflake />} label="AC" />}
        {reservation?.facilities.includes("usb") && <Facility icon={<FaUsb />} label="USB" />}
        {reservation?.facilities.includes("gps") && <Facility icon={<FaCar />} label="GPS" />}
      </div>

      {/* Price & Status */}
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-teal-700">
          ${reservation?.total_price} <span className="text-sm text-gray-500">/ rental</span>
        </p>

        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition">
          {reservation?.status === "pending" ? "Confirm" : "View"}
        </button>
      </div>
    </div>
  );
}

function Facility({ icon, label }) {
  return (
    <div className="flex items-center gap-1 border border-teal-200 text-teal-700 px-3 py-1 rounded-full text-xs">
      {icon}
      <span>{label}</span>
    </div>
  );
}
