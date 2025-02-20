import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "f11b9a21";

  //fetch the query results
  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        const URL = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(URL, { signal: controller.signal });

          if (!res.ok)
            //in case 400 or other error
            throw new Error("Something went wrong with fetching the movies");

          const data = await res.json();
          // incase of bad search input
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.log(err.message);
          if (err.name === "TypeError" && err.message === "Failed to fetch") {
            //handles internet disconnect
            setError("Network error: Please check your internet connection.");
          }
          if (err.name !== "AbortError") {
            setError(err.message); // Handles custom error from the 'if (!res.ok)' check
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();
      //cleanup function to abort all previous api calls when a new one is being initiated
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
