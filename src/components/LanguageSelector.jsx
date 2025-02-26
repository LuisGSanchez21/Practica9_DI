import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation(); 

  // Load language from localStorage when the component mounts
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  // Function to change language and store in localStorage
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="mt-12 bg-white/20 backdrop-blur-lg px-10 py-4 rounded-full inline-block shadow-lg animate-fadeInWelcome">
      {languages.map((lng) => (
        <button
          key={lng.code}
          className={`px-4 py-2 flex items-center gap-2 text-lg font-semibold rounded-full transition duration-300
            ${
              lng.code === i18n.language
                ? "bg-white text-indigo-700 shadow-md"
                : "bg-indigo-700 text-white hover:bg-indigo-500"
            }`}
          onClick={() => changeLanguage(lng.code)}
        >
          <span className="text-xl">{lng.flag}</span> {lng.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
