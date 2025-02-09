/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Search } from "./components/search";
import Spinner from "./components/spinner";
import MovieCard from "./components/movieCard";

const BASE_URL = "https://inquisitive-banoffee-5b24b3.netlify.app/.netlify/functions/tmdb";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
    // eslint-disable-next-line no-dupe-keys
    
  },
};  

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debonceSearchTerm, setDebonceSearchTerm] = useState('')
  useDebounce(() => setDebonceSearchTerm(searchTerm) , 500 , [searchTerm])

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setErrorMessage("No movies found.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debonceSearchTerm);
  }, [debonceSearchTerm]);  

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find<span className="text-gradient"> Movies</span> You will Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* ✅ تم تصحيح الـ prop */}
        </header>
        <section className="all-movies">
          <h2 className="mt-[30px]">All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />  
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
