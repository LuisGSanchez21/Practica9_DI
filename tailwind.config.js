/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Ajusta rutas a tu proyecto Astro
    "./src/**/*.astro",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      // Puedes añadir colores, tipografías personalizadas, etc.
    },
  },
  plugins: [
    // Si quieres plugins como @tailwindcss/typography
  ],
};

