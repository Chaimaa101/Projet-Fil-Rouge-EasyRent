import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const QuickLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },

];

const Footer = () => {
  return (
    <footer className="bg-teal-400 text-white mt-10 rounded-t-3xl bottom-0">
      <section className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src="/logo.png" alt="EasyRent Logo" className="w-36" />
            <p className="text-sm">
           Votre partenaire de confiance pour la location de voitures haut de gamme.
            Découvrez la liberté de la route avec notre service exceptionnel.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#"><FaFacebook className="text-xl hover:text-gray-200" /></a>
              <a href="#"><FaInstagram className="text-xl hover:text-gray-200" /></a>
              <a href="#"><FaTwitter className="text-xl hover:text-gray-200" /></a>
              <a href="#"><FaYoutube className="text-xl hover:text-gray-200" /></a>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              {QuickLinks.map((link, idx) => (
                <li key={idx} className="flex items-center gap-1 hover:text-gray-200 cursor-pointer">
                  <span>&#10148;</span>
                  <span>{link.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-3">Liens Rapides</h2>
            <ul className="space-y-2">
              {QuickLinks.map((link, idx) => (
                <li key={idx} className="flex items-center gap-1 hover:text-gray-200 cursor-pointer">
                  <span>&#10148;</span>
                  <span>{link.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-3">Informations de Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FaPhone /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><FaEnvelope /> info@carrental.com</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Main St, City, State 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white mt-10 pt-4 text-center text-sm">
          © 2026 EasyRent. All rights reserved.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
