// eslint-disable-next-line no-undef
exports.handler = async (event) => {
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjEyYjFkNTg4YzBhZmY5YzI4MTcyMjlhMGY1MDIyZSIsIm5iZiI6MTczODgzNjk1My42OTIsInN1YiI6IjY3YTQ4YmQ5ODg1OGM4NzA1YTY2ZTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WNo8h9snlnLbQb3y27afYIRn5s9Kgc4Y2yF7DH4Raq4'; // ضع هنا الـ API Key الخاص بك
    const BASE_URL = 'https://api.themoviedb.org/3';
    const endpoint = `${BASE_URL}${event.queryStringParameters.endpoint}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch data from TMDB' }),
      };
    }
  };
  