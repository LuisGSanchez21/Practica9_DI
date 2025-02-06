import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 mt-12">
      <div className="container mx-auto px-6 text-center text-white">
        {/* Footer Logo or Main Text */}
        <div className="mb-8">
          <span className="text-4xl font-bold">Web Development Courses</span>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a href="/" className="text-white hover:text-gray-200 text-xl font-semibold transition duration-300">
            Home
          </a>
          <a href="/courses" className="text-white hover:text-gray-200 text-xl font-semibold transition duration-300">
            Courses
          </a>
          <a href="/about" className="text-white hover:text-gray-200 text-xl font-semibold transition duration-300">
            About
          </a>
          <a href="/contact" className="text-white hover:text-gray-200 text-xl font-semibold transition duration-300">
            Contact
          </a>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-8 text-lg">
          <p>&copy; 2025 CourseApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
