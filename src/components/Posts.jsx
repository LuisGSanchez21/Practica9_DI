import { useEffect, useState } from 'react';
import CartButton from './Cart';
import PostDialog from './PostDialog';

const CourseList = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/cursos.json');
        const posts = await res.json();
        setAllPosts(Object.values(posts));
      } catch (err) {
        console.error('Error fetching data from Firebase:', err);
      }
    };

    fetchPosts();
  }, []);

  // Add to cart handler
  const handleAddToCart = (post) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.some(item => item.id === post.id)) {
      cart.push(post);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${post.titulo} added to cart!`);
    } else {
      alert("Item is already in the cart!");
    }
  };

  return (
    <div className='bg-black'>
      <CartButton client:load />
      <PostDialog />

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">All Available Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
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
                <p className="mt-2 text-lg font-semibold">{post.precio} USD</p>

                <a
                  href={`/courses/${post.id}`}
                  className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-gray-800 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-200"
                >
                  View Details
                </a>

                <button
                  onClick={() => handleAddToCart(post)}
                  className="inline-block mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
