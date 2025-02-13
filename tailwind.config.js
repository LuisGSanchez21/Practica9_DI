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
      animation: {
        fadeInHeader: "fadeInHeader 1s ease-out forwards",
        fadeInButton: "fadeInButton 1s ease-out forwards",
        fadeInWelcome: "fadeInWelcome 1s ease-out forwards",
      },
      keyframes: {
        fadeInHeader: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInButton: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInWelcome: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    // Si quieres plugins como @tailwindcss/typography
  ],
  
};

