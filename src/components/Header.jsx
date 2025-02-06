import React, { useEffect, useState } from 'react';

const Header = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState('Invitado');

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem('user'))?.usuario || 'Invitado';
      setUsuarioLogeado(user); // Update the state with the logged-in user
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://www.classcentral.com/report/wp-content/uploads/2022/04/BCG-Web-Development-NEW-Banner.png"
            className="w-200 h-auto" // Make the logo significantly larger
          />
          <span className="mt-3 text-4xl font-extrabold text-white">Web Developer Courses</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8 mb-4">
          <a href="/" className="text-white hover:text-gray-200 font-semibold transition duration-300">
            Home
          </a>
          <a href="/courses" className="text-white hover:text-gray-200 font-semibold transition duration-300">
            Courses
          </a>
          <a href="/about" className="text-white hover:text-gray-200 font-semibold transition duration-300">
            About
          </a>
          <a href="/contact" className="text-white hover:text-gray-200 font-semibold transition duration-300">
            Contact
          </a>
          <a href="/login" className="text-white hover:text-gray-200">Log In</a>
        </nav>

        {/* User Profile */}
        <div className="flex items-center mt-4">
          <img
            src="https://via.placeholder.com/150"
            className="h-32 w-32 rounded-full border-4 border-white"
          />
          <span className="ml-3 text-white text-2xl font-semibold">Bienvenido {usuarioLogeado}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;