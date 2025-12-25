import React from "react";

export default function HowItWorks() {
   const steps = [
    {
      number: 1,
      title: "Choisissez votre véhicule",
      description:
        "Parcourez notre flotte et sélectionnez la voiture qui correspond à vos besoins. Utilisez les filtres pour trouver rapidement le véhicule parfait.",
    },
    {
      number: 2,
      title: "Entrez vos coordonnées",
      description:
        "Fournissez vos informations personnelles et les détails de location : nom complet, numéro de téléphone, adresse e-mail, localisation, lieu et date/heure de prise et restitution.",
    },
    {
      number: 3,
      title: "Confirmez les détails et payez",
      description:
        "Choisissez votre méthode de paiement (carte de crédit/débit, paiement en ligne) et acceptez les conditions de location.",
    },
    {
      number: 4,
      title: "Confirmation de réservation",
      description:
        "Votre réservation est complète ! Vous avez maintenant votre voiture réservée et pouvez nous contacter à tout moment si vous avez besoin de modifier quelque chose.",
    },
  ];


  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
       <h2 className="text-3xl font-bold text-center text-teal-700 mb-4">
        Comment ça marche ?
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Du choix de votre voiture à la prise de la route — notre processus simple et étape par étape rend la réservation rapide, claire et sans stress.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Image */}
        <div className="flex-1">
          <img
            src="/brabus.jpg"
            alt="Car example"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Steps */}
        <div className="flex-1 flex flex-col gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              {/* Number Circle */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-lg">
                {step.number}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
