import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';

const CurrencySelector = () => {
  const { t } = useTranslation()
  const [currency, setCurrency] = useState(null);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);  
      window.location.reload()
    }
  };

  useEffect(() => {
   
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('currency');
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        setCurrency('EUR');
      }
    }
  }, []); 

  if (currency === null) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  // Determine the currency symbol
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'EUR':
      default:
        return '€';
    }
  };

  return (
<div className="mt-12 bg-white/20 backdrop-blur-lg px-10 py-6 rounded-full inline-block shadow-lg animate-fadeInWelcome">
  <h3 className="text-3xl font-semibold text-white text-center">{t("selectCurrency")}</h3>

  <div className="flex justify-center space-x-6 mt-4">
    <button
      onClick={() => handleCurrencyChange('EUR')}
      className="px-6 py-3 text-lg font-semibold text-white bg-blue-500/80 rounded-full transition duration-300 hover:bg-blue-500 shadow-md"
    >
      EUR (€)
    </button>
    <button
      onClick={() => handleCurrencyChange('USD')}
      className="px-6 py-3 text-lg font-semibold text-white bg-green-500/80 rounded-full transition duration-300 hover:bg-green-500 shadow-md"
    >
      USD ($)
    </button>
    <button
      onClick={() => handleCurrencyChange('GBP')}
      className="px-6 py-3 text-lg font-semibold text-white bg-yellow-500/80 rounded-full transition duration-300 hover:bg-yellow-500 shadow-md"
    >
      GBP (£)
    </button>
  </div>

  <div className="text-center text-2xl text-white mt-4">
    <p>
      {t("currentCurrency")} 
      <span className="font-bold"> {getCurrencySymbol(currency)} ({currency})</span>
    </p>
  </div>
</div>

  );
};

export default CurrencySelector;
