import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';

const Footer = () => {
  const { t } = useTranslation()
  
  return (
    <footer className="relative w-full bg-gradient-to-r from-indigo-700 to-purple-800 py-16 text-white text-center">

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>


      <div className="relative z-10 container mx-auto px-8">
        <div className="mb-10">
          <span className="text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
            {t("title")}
          </span>
        </div>

      
        <div className="flex justify-center gap-6 mb-10">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="p-4 bg-white/10 rounded-full transition transform hover:scale-110 hover:bg-yellow-400"
            >
              <Icon className="text-2xl text-white transition hover:text-gray-900" />
            </a>
          ))}
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
