import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-teal-50 text-gray-800">
      {/* Header */}
      <header className="bg-teal-500 text-white py-12 text-center">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          À propos de EasyRent
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Louez votre voiture facilement et rapidement.
        </motion.p>
      </header>

      {/* Section Notre Mission */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold text-teal-600 mb-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Notre Mission
        </motion.h2>
        <motion.p
          className="text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Chez EasyRent, notre mission est de rendre la location de voitures simple,
          rapide et fiable. Nous connectons les utilisateurs avec des véhicules de
          qualité, tout en garantissant une expérience transparente et sécurisée.
        </motion.p>
      </section>

      {/* Section Nos Valeurs */}
      <section className="py-16 px-6 bg-teal-100">
        <motion.h2
          className="text-3xl font-semibold text-teal-700 mb-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Nos Valeurs
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {["Fiabilité", "Simplicité", "Sécurité"].map((valeur, index) => (
            <motion.div
              key={valeur}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold mb-2 text-teal-600">{valeur}</h3>
              <p>
                {valeur === "Fiabilité" &&
                  "Nous garantissons des véhicules en parfait état et des services transparents."}
                {valeur === "Simplicité" &&
                  "Notre application est intuitive et facile à utiliser, pour tous les utilisateurs."}
                {valeur === "Sécurité" &&
                  "Vos informations et vos transactions sont protégées et confidentielles."}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
