import { useEffect, useState } from "react";
import CartButton from "./Cart";
import Modal from "./ModalVideo.jsx";
import HeartButton from "./HeartButton.jsx";
import { useTranslation } from "react-i18next";
import '../utils/i18n.js';


const exchangeRates = {
  EUR: 1,   
  USD: 1.1, 
  GBP: 0.85, 
};

const CourseList = () => 
  
  {
  const { t } = useTranslation()
    
  const [allPosts, setAllPosts] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [sortOption, setSortOption] = useState("price-asc");
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/cursos.json"
        );
        const posts = await res.json();
        setAllPosts(Object.values(posts));

        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        if (storedUser?.comprados) {
          const boughtCourses = Object.values(posts).filter((post) =>
            storedUser.comprados.includes(post.id)
          );
          setPurchasedCourses(boughtCourses);
        }
      } catch (err) {
        console.error("Error fetching data from Firebase:", err);
      }
    };

    fetchPosts();

    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD": return "$";
      case "GBP": return "£";
      case "EUR": 
      default: return "€";
    }
  };

  const convertPrice = (price) => {
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const sortedCourses = [...allPosts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc": return a.precio - b.precio;
      case "price-desc": return b.precio - a.precio;
      case "duration-asc": return parseInt(a.duracion) - parseInt(b.duracion);
      case "duration-desc": return parseInt(b.duracion) - parseInt(a.duracion);
      case "difficulty-asc": return a.nivel.localeCompare(b.nivel);
      case "difficulty-desc": return b.nivel.localeCompare(a.nivel);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <CartButton client:load />

      <div className="container mx-auto px-6 py-8">

        {purchasedCourses.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center text-green-400 mb-8">
              {t("boughtCourses")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {purchasedCourses.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={post.image}
                    alt={post.titulo}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-semibold text-green-400">
                      {post.titulo}
                    </h3>
                    <p className="text-lg mt-2">{post.instructor}</p>
                    <p className="text-sm mt-1">{post.nivel} | {post.duracion}</p>
                    <Modal videoUrl={post.video} triggerText={t("viewVideo")} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400">{t("cursosDisponibles")}</h2>

          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            <option value="price-asc">{t("price_asc")}</option>
            <option value="price-desc">{t("price_desc")}</option>
            <option value="duration-asc">{t("duration_asc")}</option>
            <option value="duration-desc">{t("duration_desc")}</option>
            <option value="difficulty-asc">{t("difficulty_asc")}</option>
            <option value="difficulty-desc">{t("difficulty_desc")}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={post.image}
                  alt={post.titulo}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-semibold text-yellow-400">{post.titulo}</h3>
                  <p className="text-lg mt-2">{post.instructor}</p>
                  <p className="text-sm mt-1">{post.nivel} | {post.duracion}</p>
                  <p className="mt-2 text-lg font-semibold">
                    {getCurrencySymbol(currency)} {convertPrice(post.precio)}
                  </p>

                  <a
                    href={`Practica9_DI/courses/${post.id}`}
                    className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-200"
                  >
                    {t("seeDetails")}
                  </a>

                  {post.pagado ? (
                    <Modal videoUrl={post.video} triggerText="Ver Video" />
                  ) : (
                    <button
                      onClick={() => handleAddToCart(post)}
                      className="inline-block mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                      {t("addToCart")}
                    </button>
                  )}
                  <HeartButton curso={post} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">Cursos No Disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
