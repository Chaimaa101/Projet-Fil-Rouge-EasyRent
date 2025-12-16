import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <>
      <section className="px-10 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="p-3 rounded bg-black/40"
              placeholder="Your Name"
            />
            <input className="p-3 rounded bg-black/40" placeholder="Email" />
          </div>
          <textarea
            className="w-full mt-6 p-3 rounded bg-black/40"
            rows="5"
            placeholder="Your Message"
          ></textarea>
          <button className="mt-6 w-full bg-blue-600 py-3 rounded-xl">
            Send Message
          </button>
        </motion.form>
      </section>
    </>
  );
}

export default Contact;
