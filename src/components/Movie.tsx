
import { Link } from 'react-router-dom';
import type { IMovie } from '../utils/util';

const Movie = ({ movies: movie }: { movies: IMovie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-black shadow-2xl
                   overflow-hidden w-full max-w-xs sm:w-80 cursor-pointer rounded-md
                   transform transition duration-500 hover:scale-105 hover:shadow-indigo-600/50"
      >
        {/* Poster Image */}
        <div className="overflow-hidden-2xl">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="p-5  bg-slate-800 to-transparent">
          <h2
            className="text-xl font-extrabold text-white truncate drop-shadow-lg
                       mb-1"
            title={movie.title}
          >
            {movie.title}
          </h2>
          <p className="flex items-center space-x-2 text-yellow-400 font-semibold drop-shadow">
            <span>⭐</span>
            <span>{Number(movie.vote_average).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Movie;
