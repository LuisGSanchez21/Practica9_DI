import { useState, useEffect } from 'react';
import { fetchPosts } from '../utils/fetchPosts';

const SearchDialog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);

  
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  const openDialog = () => {
    setIsDialogOpen(true);
    document.body.style.overflow = 'hidden'; 
  };


  const closeDialog = () => {
    setIsDialogOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredPosts = posts.filter((post) =>
    post && post.titulo && post.titulo.toLowerCase().includes(searchTerm)
  );
  
  return (
    <>
      <button
  onClick={openDialog}
  className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white text-2xl font-semibold rounded-full border border-white hover:bg-white/30 transition-transform transform hover:scale-105"
>
    Buscar Cursos
</button>


      {isDialogOpen && (
        <div
          id="postDialog"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          aria-labelledby="searchDialogTitle"
          role="dialog"
        >
          <div className="bg-gray-800 p-8 rounded-lg w-11/12 md:w-1/2">
            <h2
              id="searchDialogTitle"
              className="text-3xl text-white mb-4"
            >
              Buscar Cursos
            </h2>

            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Type to search..."
              className="w-full p-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />


            <div id="postList" className="space-y-4 mt-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <a
                    href={`/courses/${post.id}`}
                    key={post.id}
                    className="block text-white hover:text-yellow-400 transition duration-200 text-xl"
                  >
                    {post.titulo}
                  </a>
                ))
              ) : (
                <p className="text-gray-400">Sin resultados</p>
              )}
            </div>

      
            <button
              onClick={clearSearch}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Limpiar
            </button>

            <button
              onClick={closeDialog}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
