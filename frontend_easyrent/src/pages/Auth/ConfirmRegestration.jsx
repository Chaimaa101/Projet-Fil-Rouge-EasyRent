import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function ConfirmRegestration() {
  const {nom} = useParams()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Bienvenue {nom} 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Votre inscription a été confirmée avec succès.
          Nous sommes ravis de vous compter parmi nous.
        </p>

        <Link
          to="/userPage"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Mon Compte
        </Link>
      </div>
    </div>
  );
}

export default ConfirmRegestration;
