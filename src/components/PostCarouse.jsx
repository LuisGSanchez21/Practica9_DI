import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';

const Carousel = () => {
    const { t } = useTranslation()
  const [destacados, setDestacados] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/cursos.json');
        const posts = await response.json();
        const destacadosData = Object.values(posts).filter(post => post.destacado === true);
        setDestacados(destacadosData);
      } catch (err) {
        console.error('Error fetching data from Firebase:', err);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % destacados.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [destacados, isAutoPlaying]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destacados.length) % destacados.length);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destacados.length);
    setIsAutoPlaying(false);
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 mt-10 mb-6 tracking-wide uppercase drop-shadow-lg">
        🚀 {t("importantCoruses")}
      </h1>

      <div className="relative w-full max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-xl bg-gray-900">
        <div className="relative w-full flex justify-center items-center">
          {destacados.length > 0 && (
            <>

              <div
                className="w-full h-[500px] flex transition-transform duration-700 ease-in-out transform"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {destacados.map((post, index) => (
                  <div key={index} className="min-w-full flex-shrink-0 flex flex-col items-center">
                    <img
                      src={post.image}
                      alt={post.titulo}
                      className="w-full h-[350px] object-cover rounded-t-xl shadow-lg brightness-90 hover:brightness-100 transition"
                    />

   
                    <div className="w-full bg-gray-800 p-6 rounded-b-xl text-center text-white">
                    <a
                      href={`/courses/${post.id}`}
                      className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-200"
                    >
                      {t("seeDetails")}
                    </a>
                      <h3 className="text-2xl font-bold text-yellow-400">{post.titulo}</h3>
                      
                    </div>
                  </div>
                ))}
              </div>


              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-60 rounded-full p-3 shadow-md hover:bg-opacity-80 transition-all"
              >
                <span className="text-3xl">←</span>
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-60 rounded-full p-3 shadow-md hover:bg-opacity-80 transition-all"
              >
                <span className="text-3xl">→</span>
              </button>
              


              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {destacados.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-yellow-400 scale-110' : 'bg-gray-500'
                    }`}
                  ></button>
            
                ))}
              </div>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
