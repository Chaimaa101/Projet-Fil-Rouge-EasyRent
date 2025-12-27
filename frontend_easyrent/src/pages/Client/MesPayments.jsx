import { useContext, useEffect } from "react";
import { FaWifi, FaSnowflake, FaUsb, FaCar, FaStar } from "react-icons/fa";
import { PaymentContext } from "../../Context/PaymentProvider";

export default function MesPayments() {

  const {payments,pending,error,getPayments } = useContext(PaymentContext)
  useEffect(() =>{
    getPayments()
  },[])
  console.log(payments)
  return (
    <>
    <div className= "grid grid-cols-2 ">
   {payments.map((payment, index) => (
    <div key ={index} className="bg-white rounded-xl shadow-md border border-teal-100 p-6 m-12 hover:shadow-lg transition">
   
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {payment?.vehicule?.nom} • {payment?.vehicule?.marque?.nom}
          </h2>
          <p className="text-sm text-gray-500">{payment?.days}</p>
        </div>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <FaStar />
          <span>{payment?.rating || 5}</span>
        </div>
      </div>

      <div className="flex justify-between my-4 text-gray-600 text-sm">
        <div>
          <p className="font-semibold">From:</p>
          <p>{payment?.start_date}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">To:</p>
          <p>{payment?.end_date}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-teal-700">
          ${payment?.total_price} <span className="text-sm text-gray-500">/ rental</span>
        </p>

        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg transition">
          {payment?.status === "pending" ? "Confirm" : "View"}
        </button>
      </div>
    </div>
    ))}
    </div>
    </>
  );
}
