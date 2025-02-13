import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

const HeartButton = ({ curso }) => {
  if (!curso) {
    console.error('Curso is undefined or null');
    return null;
  }

  const [isLiked, setLiked] = useState(false);
  const [likes, setLikes] = useState(curso.likes);

  const BASE_URL = "https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/";

  const handleLike = async () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLiked(!isLiked);
    setLikes(newLikes);

    try {
      const response = await fetch(`${BASE_URL}/cursos/${curso.id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes }),
      });

      if (!response.ok) throw new Error('Failed to update likes in the database');
    } catch (err) {
      console.error(err.message);
      setLiked(isLiked);
      setLikes(isLiked ? likes + 1 : likes - 1);
    }
  };

  useEffect(() => {
    setLiked(false);
  }, []);

  return (
    <button
      onClick={handleLike}
      className="flex items-center text-gray-500 hover:text-red-500 transition duration-300"
    >
      <FontAwesomeIcon icon={isLiked ? faHeart : faHeartBroken} className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
      <span className="ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
};

export default HeartButton;
