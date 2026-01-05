import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthProvider";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    phone: "",
    message: "",
  });

  const { contact, errors, loading } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleContact = async (e) => {
    e.preventDefault();

    const result = await contact(formData);

    if (result) {
      setFormData({
        nom: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <section className="px-6 md:px-16 py-20">
      <h2 className="text-5xl font-bold text-teal-600 text-center mb-12">
        Nous contacter
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-teal-400 to-teal-100 p-10 rounded-2xl backdrop-blur-xl"
          onSubmit={handleContact}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                className="w-full p-3 rounded bg-white/80 outline-none"
                placeholder="Votre nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
              />
              {errors?.nom && (
                <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
              )}
            </div>

            <div>
              <input
                className="w-full p-3 rounded bg-white/80 outline-none"
                placeholder="Votre email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <input
              className="w-full p-3 rounded bg-white/80 outline-none"
              placeholder="Votre téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors?.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="mt-6">
            <textarea
              className="w-full p-3 rounded bg-white/80 outline-none"
              rows="5"
              placeholder="Votre message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors?.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white py-3 rounded-xl transition"
          >
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full h-[420px] rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.935433088902!2d-7.622211074013355!3d33.581025642467864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d39daae76ecf%3A0x9907df41e3985d8b!2sSimplon%20Maghreb!5e0!3m2!1sar!2sma!4v1754989492175!5m2!1sar!2sma"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
