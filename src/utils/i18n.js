import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; 
import { initReactI18next } from 'react-i18next';

// Inicializar i18next
i18next
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    debug: true, // ✅ Show debug logs in console


    interpolation: {
      escapeValue: false, // ✅ React already handles escaping
    },
    resources: {
      es: {
        translation: {
          title: 'Aprende Programación Web',
          subtitle: 'La plataforma perfecta para aprender navegación web',
          login: 'Iniciar sesión',
          search: 'Buscar Cursos',
          clean: 'Limpiar',
          cerrar: 'Cerrar',
          noResults: 'No se encontraron resultados',
          welcome: 'Bienvenido',
          selectCurrency: 'Selecciona la moneda',
          currentCurrency: 'Moneda actual',
          importantCoruses: 'Cursos Destacados',
          seeDetails: 'Ver Detalles',
          cursosDisponibles: 'Cursos Disponibles',
          boughtCourses: 'Cursos Comprados',
          price_asc: 'Precio: Menor a Mayor',
          price_desc: 'Precio: Mayor a Menor',
          duration_asc: 'Duración: Menor a Mayor',
          duration_desc: 'Duración: Mayor a Menor',
          difficulty_asc: 'Dificultad: Avanzado a Principiante',
          difficulty_desc: 'Dificultad: Principiante a Avanzado',
          addToCart: 'Añadir al Carrito',
          viewVideo: 'Ver Video',
          cart: 'Carrito',
          emptyCart: 'Carrito Vacío',
          pay: 'Pagar',
          continueAsGuest: 'Continuar como Invitado',
          instructor: 'Instructor',
          dificultad: 'Dificultad',
          duracion: 'Duración',
          temario: 'Temario',
          opiniones : 'Opiniones',
          volver: 'Volver',
        }
      },
      en: {
        translation: {
          title: 'Learn Web Development',
          subtitle: 'The perfect platform to learn web development',
          login: 'Log in',
          search: 'Search Courses',
          clean: 'Clean',
          cerrar: 'Close',
          noResults: 'No results found',
          welcome: 'Welcome',
          selectCurrency: 'Select the currency',
          currentCurrency: 'Current currency',
          importantCoruses: 'Important Courses',
          seeDetails: 'View Details',
          cursosDisponibles: 'Available Courses',
          boughtCourses: 'Bought Courses',
          price_asc: 'Price: Low to High',
          price_desc: 'Price: High to Low',
          duration_asc: 'Duration: Low to High',
          duration_desc: 'Duration: High to Low',
          difficulty_asc: 'Difficulty: Advanced to Beginner',
          difficulty_desc: 'Difficulty: Beginner to Advanced',
          addToCart: 'Add to Cart',
          viewVideo: 'View Video',
          cart: 'Cart',
          emptyCart: 'Empty Cart',
          pay: 'Pay',
          continueAsGuest: 'Continue as Guest',
          instructor: 'Instructor',
          dificultad: 'Difficulty',
          duracion: 'Duration',
          temario: 'Syllabus',
          opiniones : 'Opinions',
          volver: 'Back',

        }
      }
    }
  });

export default i18next; // ✅ Export so other files can use it
