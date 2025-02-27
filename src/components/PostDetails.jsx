import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';

const exchangeRates = {
  EUR: 1,
  USD: 1.1,  // Example conversion rate
  GBP: 0.85, // Example conversion rate
};

const PostDetails = ({ post }) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  const convertPrice = (price) => {
    return (price * (exchangeRates[currency] || 1)).toFixed(2);
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$";
      case "GBP":
        return "£";
      case "EUR":
      default:
        return "€";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 text-white max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <img src={post.image} alt={post.titulo} className="w-full h-64 object-cover" />

        <div className="p-6">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">{post.titulo}</h2>
          <p className="text-lg text-gray-300 mb-2"><strong>{t("instructor")}:</strong> {post.instructor}</p>
          <p className="text-lg text-gray-300 mb-2"><strong>{t("dificultad")}:</strong> {post.nivel}</p>
          <p className="text-lg text-gray-300 mb-2"><strong>{t("duracion")}:</strong> {post.duracion}</p>

          <div className="bg-gray-700 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t("temario")}</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              {post.temario.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t("opiniones")}</h3>
            <ul className="space-y-3">
              {post.opiniones.map((opinion, index) => (
                <li key={index} className="bg-gray-600 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-300 font-bold">⭐ {opinion.calificacion}</span>
                  </div>
                  <p className="text-gray-300">"{opinion.comentario}"</p>
                  <span className="text-sm text-gray-400">- {opinion.usuario}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-2xl font-bold text-yellow-400 mt-4">
            {getCurrencySymbol(currency)} {convertPrice(post.precio)}
          </p>

          <div className="flex justify-between mt-6">
            <a href="../../" className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200">
              {t("volver")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
