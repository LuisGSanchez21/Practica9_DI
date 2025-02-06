import { useState, useEffect } from 'react';
import { fetchPosts } from '../utils/fetchPosts';

const SearchDialog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchData = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    fetchData();
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Function to open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Function to clear the search input
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filtered posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.titulo.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      {/* Button to open the dialog */}
      <button
        onClick={openDialog}
        className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition duration-200"
      >
        Search Courses
      </button>

      {/* The Dialog */}
      {isDialogOpen && (
        <div
          id="postDialog"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-gray-800 p-8 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-3xl text-white mb-4">Search Courses</h2>

            {/* Search Input */}
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Type to search..."
              className="w-full p-2 rounded-lg text-gray-800"
            />

            {/* List of Posts */}
            <div id="postList" className="space-y-4 mt-4">
              {filteredPosts.map((post) => (
                <a
                  href={`/courses/${post.id}`}
                  key={post.id}
                  className="block text-white hover:text-yellow-400 transition duration-200 text-xl"
                >
                  {post.titulo}
                </a>
              ))}
            </div>

            {/* Clear Search Button */}
            <button
              onClick={clearSearch}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Clear
            </button>

            {/* Close Button */}
            <button
              onClick={closeDialog}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDialog;
