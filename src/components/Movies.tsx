import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { MovieContext } from '../contexts/MovieContext';
import Movie from './Movie';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

const Movies = () => {
  const { allMovies } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Szűrt lista
  const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
const placeholders = [
    "Enter any movie name",
    "Enter any actor"
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col items-center justify-start pt-24 px-4"
    >
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
          All Movies Library
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Browse through all movies including popular, top-rated, and upcoming releases.
        </p>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={onSubmit}
      />
    </div>

      {/* Movies Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((r, i) => (
            <motion.div
              key={`all-movie-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Movie movies={r} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg mt-10">
            No movies found matching "<span className="italic">{searchTerm}</span>"
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Movies;
