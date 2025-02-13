import { useEffect, useState } from "react";


const CartButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  //Quitar del carro
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //Procesar pago
  const processPayment = async () => {
    if (cartItems.length === 0) {
      alert("Carrito Vacío.");
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || user.usuario === "invitado") {
      alert("Inicie sesión para procesar el pago.");
      return;
    }
  
    try {
      const usersData = await fetch(
        "https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json"
      ).then((res) => res.json());
  
      // Find the user's key in Firebase
      const userKey = Object.keys(usersData).find(
        (key) => usersData[key].usuario === user.usuario
      );
  
      if (!userKey) {
        alert("User not found.");
        return;
      }
  
      // Variable de cursos comprados por el usuario y de cursos que han sido comprados
      const existingComprados = usersData[userKey].comprados || [];
      const newComprados = [...existingComprados, ...cartItems.map((item) => item.id)];
  
      // Crea la nueva clase llamada comprados en el usuario, con el id de cada curso
      await fetch(
        `https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/usuarios/${userKey}.json`,
        {
          method: "PATCH", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comprados: newComprados }),
        }
      );
  
      // Actualiza el usuario en localStorage
      const updatedUser = { ...user, comprados: newComprados };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      //Limpiar el carrita
      setCartItems([]);
      localStorage.removeItem("cart");
      alert("Pago exitoso!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al pagar, intentelo más tarde.");
    }
  };
  
  
  

  return (
    <div>
      <button
        onClick={() => setShowCart(true)}
        className="fixed text-black top-4 right-4 px-8 py-4 bg-white/20 backdrop-blur-lg text-2xl font-semibold rounded-full border border-black hover:bg-white/30 transition-transform transform hover:scale-105 z-50"
      >
        🛒 Carrito({cartItems.length})
      </button>

      {/* Modal con los componetes del carrito, boton de cierre, quitar y añadir*/}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold text-yellow-400 mb-4">🛒 Carrito</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Carrito Vacío</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-700 py-2">
                    <div>
                      <p className="text-lg font-semibold">{item.titulo}</p>
                      <p className="text-sm text-gray-400">{item.precio} USD</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {cartItems.length > 0 && (
              <button
                onClick={processPayment}
                className="mt-4 w-full p-2 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
              >
                Pagar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default CartButton;
