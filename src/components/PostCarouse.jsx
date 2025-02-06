import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const [destacados, setDestacados] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/cursos.json');
        const posts = await response.json();
        // Filter the posts to only show those with "destacado: true"
        const destacadosData = Object.values(posts).filter(post => post.destacado === true);
        setDestacados(destacadosData);
      } catch (err) {
        console.error('Error fetching data from Firebase:', err);
      }
    };

    fetchPosts();
  }, []);

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destacados.length) % destacados.length);
  };

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destacados.length);
  };

  return (
    <div className="carousel relative w-full max-w-6xl mx-auto overflow-hidden shadow-lg rounded-lg bg-gray-900">
      <div className="carousel-inner relative w-full">
        {destacados.map((post, index) => (
          <div
            key={post.id}
            className={`carousel-item w-full transition-all duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
          >
            <img
              src={post.image}
              alt={post.titulo}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="text-white text-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-4 px-6 rounded-b-lg">
              <h3 className="text-3xl font-bold text-yellow-400">{post.titulo}</h3>
              <p className="mt-2 text-xl">{post.instructor}</p>
              <p className="mt-1 text-sm">{post.nivel} | {post.duracion}</p>
              <p className="mt-2 text-lg font-semibold">${post.precio} USD</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 shadow-lg hover:bg-opacity-70 transition"
      >
        <span className="text-2xl">&lt;</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 shadow-lg hover:bg-opacity-70 transition"
      >
        <span className="text-2xl">&gt;</span>
      </button>
    </div>
  );
};

export default Carousel;
