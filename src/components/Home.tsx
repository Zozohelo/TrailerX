import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MovieContext } from '../contexts/MovieContext';
import Movie from './Movie';
import { FlipWords } from '../ui/flip-words';
import MovieCarousel from './MovieCarousel';

const Home = () => {
  const { popularMovies } = useContext(MovieContext);
  const words = ["exciting", "thrilling", "dramatic", "cinematic"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-20 bg-gradient-to-b from-black via-blue-500"
    >
      {/* Hero Section */}
      <div className="text-center w-full max-w-5xl px-2 sm:px-6">
        <div className='p-10'>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight">
            Discover&nbsp;
            <span className="inline-block text-indigo-400">
              <FlipWords words={words} />
            </span>
            <br />
            Movies
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto px-2">
            Watch trailers, explore details, and dive deep into the world of cinema — all in one place.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <MovieCarousel movies={popularMovies} />

      {/* Movies Grid */}
      <div className="mt-12 w-3/4 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {popularMovies.map((movie, i) => (
            <motion.div
              key={`home-movie-${i}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeInOut" }}
              className="w-full max-w-full sm:max-w-[200px]"
            >
              <Movie movies={movie} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
