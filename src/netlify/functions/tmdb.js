/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const fetch = require('node-fetch');

exports.handler = async (event,  ) => {
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjEyYjFkNTg4YzBhZmY5YzI4MTcyMjlhMGY1MDIyZSIsIm5iZiI6MTczODgzNjk1My42OTIsInN1YiI6IjY3YTQ4YmQ5ODg1OGM4NzA1YTY2ZTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WNo8h9snlnLbQb3y27afYIRn5s9Kgc4Y2yF7DH4Raq4';
  const BASE_URL = 'https://inquisitive-banoffee-5b24b3.netlify.app/.netlify/functions/tmdb';

  const query = event.queryStringParameters.query || '';
  const endpoint = query
    ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    : `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data', error: error.message }),
    };
  }
};
