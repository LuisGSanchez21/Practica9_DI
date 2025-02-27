import React, { useEffect, useState } from "react";
import PostDialog from "./PostDialog";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import '../utils/i18n.js';
import CurrencySelector from "./CurrencySelector.jsx";


const Header = () => {
  const { t } = useTranslation()
  const [usuarioLogeado, setUsuarioLogeado] = useState("Invitado");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"))?.usuario || "Invitado";
      setUsuarioLogeado(user);
    }
  }, []);

  return (
    <>
      <header className="relative w-full min-h-[100vh] bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-700 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 text-white px-8 max-w-4xl animate-fadeInHeader">
          <h1 className="text-7xl font-extrabold drop-shadow-lg tracking-wide leading-tight">
          {t("title")} 
          </h1>
          <p className="mt-6 text-2xl font-light text-gray-200">
          {t("subtitle")} 
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href="./login"
              className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white text-2xl font-semibold rounded-full border border-white hover:bg-white/30 transition-transform transform hover:scale-105 animate-fadeInButton"
            >
                {t("login")} 
            </a>

            <PostDialog />
          </div>
          

          <div className="mt-12 bg-white/20 backdrop-blur-lg px-10 py-4 rounded-full inline-block shadow-lg animate-fadeInWelcome">
            <span className="text-3xl font-semibold">{t("welcome")} {usuarioLogeado}!</span>
          </div>
          
          <LanguageSelector />
          <br />
          <CurrencySelector />
        </div>

      </header>

      <section className="w-full min-h-[10vh] bg-white-100 flex items-center justify-center"></section>
    </>
  );
};

export default Header;
