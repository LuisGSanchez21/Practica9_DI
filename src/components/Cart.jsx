import { useEffect, useState } from "react";

const CartButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (post) => {
    if (!cartItems.some((item) => item.id === post.id)) {
      const updatedCart = [...cartItems, post];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const processPayment = () => {
    if(cartItems.length !== 0) {
      alert("Payment processed successfully!");
      setCartItems([]);
      localStorage.removeItem("cart");
    }else{
      alert("Your cart is empty.");
    }
   
  }
  return (
    <div>
      <button
        onClick={() => setShowCart(!showCart)}
        className="mt-12 p-4 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
      >
        Shopping Cart ({cartItems.length})
      </button>

      {showCart && (
        <div className="mt-4 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Shopping Cart
          </h2>
          <button
            onClick={() => processPayment()}
            className="mt-12 p-4 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
          >
            Processs Payment
          </button>
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-600 py-2"
                >
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {item.titulo}
                    </p>
                    <p className="text-sm text-gray-400">{item.precio} USD</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CartButton;
