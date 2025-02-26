import React, { useState } from 'react';
import '../styles/global.css';
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';

const Login = () => {
  const { t } = useTranslation()
  const [usuarioInput, setUsuarioInput] = useState('');
  const [contrasenaInput, setContrasenaInput] = useState('');

  const iniciarSesion = async () => {
    const users = await fetch('https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json')
      .then((res) => res.json())
      .catch((err) => {
        console.error('Error fetching data:', err);
        return [];
      });

    const usuarioEncontrado = Object.values(users).find(
      (user) => user.usuario === usuarioInput && user.contrasena === contrasenaInput
    );

    if (usuarioEncontrado) {
      alert('Login successful!');
      localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
      window.location.href = '/';
    } else {
      alert('Incorrect credentials');
    }
  };

  const sesionUsuario = async () => {
    const usuarioInvitado = {
      usuario: 'invitado',
    };

    alert('Iniciando sesion como invitado');
    localStorage.setItem('user', JSON.stringify(usuarioInvitado));
    window.location.href = '/'; 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">Log In</h2>
        <input
          type="text"
          value={usuarioInput}
          onChange={(e) => setUsuarioInput(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 text-white bg-gray-700"
        />
        <input
          type="password"
          value={contrasenaInput}
          onChange={(e) => setContrasenaInput(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 text-white bg-gray-700"
        />
        <button
          onClick={iniciarSesion}
          className="w-full bg-yellow-500 text-gray-900 py-2 mt-4 rounded-lg font-semibold"
        >
          Log In
        </button>
        <button 
        onClick={sesionUsuario}
        className="w-full bg-yellow-500 text-gray-900 py-2 mt-4 rounded-lg font-semibold">
          {t("continueAsGuest")}
        </button>
    
      </div>
    </div>
  );
};

export default Login;
