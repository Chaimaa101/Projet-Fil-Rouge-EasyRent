import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <section className="px-6 md:px-16 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Nous contacter
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="p-3 rounded bg-black/10 outline-none"
              placeholder="Votre nom"
            />
            <input
              className="p-3 rounded bg-black/10 outline-none"
              placeholder="Votre email"
            />
          </div>

          <textarea
            className="w-full mt-6 p-3 rounded bg-black/10 outline-none"
            rows="5"
            placeholder="Votre message"
          />

          <button className="mt-6 w-full bg-neutral-700 hover:bg-neutral-800 text-white py-3 rounded-xl transition">
            Envoyer le message
          </button>
        </motion.form>

        {/* MAP */}
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
