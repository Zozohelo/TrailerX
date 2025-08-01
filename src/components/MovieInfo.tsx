import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { IMovie } from '../utils/util';
import { div } from 'framer-motion/client';
import { FaArrowLeft } from 'react-icons/fa';

const API_KEY = 'a337d7647506201e1140aaa51a6b6b1b';

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovie({
          id: data.id,
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          vote_average: data.vote_average,
          release_date: data.release_date,
          original_language: data.original_language,
          runtime: data.runtime
        });

        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const videosData = await videosRes.json();
        const trailer = videosData.results.find(
          (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error('Hiba a film részleteinek betöltésekor:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="text-white text-center mt-28">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <>
    <div className='pt-20 mt-10 p-5 flex justify-start items-center'>
      <Link className='bg-red-500 p-2 rounded-2xl text-white flex justify-center items-center gap-1' to={'/'}><FaArrowLeft /></Link>
    </div>
    <div className="container mx-auto mt-5 px-4 flex flex-col gap-12">
      {/* Film cím */}
      <h1 className="text-5xl font-extrabold text-center text-white">
        {movie.title}
      </h1>

      {/* Film kártya */}
      <div className="bg-gray-900 bg-opacity-50 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-8">
        {/* Poszter */}
        <div className="flex-shrink-0 w-full md:w-80">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Szöveges adatok */}
        <div className="text-white flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Release Date</p>
              <p className="font-semibold">{movie.release_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Rating</p>
              <p className="font-semibold">⭐ {Number(movie.vote_average).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">RunTime</p>
              <p className="font-semibold">⏳ {Number(movie.runtime)} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Language</p>
              <p className="font-semibold uppercase">{movie.original_language}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Description</p>
            <p className="text-justify">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className="rounded-2xl shadow-2xl overflow-hidden pb-10">
        {trailerKey ? (
          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-400 text-center p-6">
            No trailer available.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default MovieInfo;
