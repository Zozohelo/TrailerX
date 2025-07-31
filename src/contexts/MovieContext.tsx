// MovieContext.tsx
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { IMovie } from "../utils/util";

interface IMovieContext {
  popularMovies: IMovie[];
  allMovies: IMovie[];
}

export const defaultMovieContext: IMovieContext = {
  popularMovies: [],
  allMovies: []
};

export const MovieContext = createContext<IMovieContext>(defaultMovieContext);

const API_KEY = 'a337d7647506201e1140aaa51a6b6b1b';

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [allMovies, setAllMovies] = useState<IMovie[]>([]);

  async function loadPopularMovies() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      const data = await response.json();
      const fetchedMovies: IMovie[] = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        original_language: movie.original_language
      }));
      setPopularMovies(fetchedMovies);
    } catch (error) {
      console.error("Hiba történt a popular filmek betöltésekor:", error);
    }
  }

  async function loadAllMovies() {
    try {
      // Most csak demonstrációként több oldalból egyesítjük a popular, top_rated és upcoming filmeket.
      const endpoints = [
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      ];

      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const results = await Promise.all(responses.map(res => res.json()));
      
      // Összefűzzük az összes filmet és kiszűrjük a duplikációkat ID alapján
      const combinedMovies = results.flatMap(data => data.results);
      const uniqueMovies = Array.from(new Map(combinedMovies.map(movie => [movie.id, movie])).values());

      const fetchedMovies: IMovie[] = uniqueMovies.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        original_language: movie.original_language
      }));

      setAllMovies(fetchedMovies);
    } catch (error) {
      console.error("Hiba történt az összes film betöltésekor:", error);
    }
  }

  useEffect(() => {
    loadPopularMovies();
    loadAllMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ popularMovies, allMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
