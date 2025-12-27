import React, { useContext } from "react";
import {  Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

function ConfirmRegestration() {
  const {user} = useContext(AuthContext)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Bienvenue {user.nom} 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Votre inscription a été confirmée avec succès.
          Nous sommes ravis de vous compter parmi nous.
        </p>

        <Link
          to="/client/completeProfile"
          className="inline-block bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
        >
          Mon Compte
        </Link>
      </div>
    </div>
  );
}

export default ConfirmRegestration;
