export async function fetchPosts() {
    const posts = await fetch('https://p9luisgil-default-rtdb.europe-west1.firebasedatabase.app/cursos.json')
      .then((res) => res.json())
      .catch((err) => {
        console.error('Error fetching data from Firebase:', err);
        return [];
      });
  
    // Return posts as an array
    return Object.values(posts);
  }
  