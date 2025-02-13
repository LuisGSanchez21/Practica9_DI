import React, { useState } from "react";
import ReactPlayer from "react-player";

const Modal = ({ videoUrl, triggerText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
      >
        {triggerText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="relative w-full max-w-6xl p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition"
            >
              ✖
            </button>


            <div className="w-full aspect-w-16 aspect-h-9">
              <ReactPlayer
                url={videoUrl}
                controls
                playing
                width="100%"
                height="80vh"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
