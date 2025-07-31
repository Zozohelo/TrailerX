import { useEffect, useState } from "react";
import type { IMovie } from "../utils/util";

interface MovieCarouselProps {
  movies: IMovie[];
  intervalMs?: number;
}

const MovieCarousel = ({ movies, intervalMs = 4000 }: MovieCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [movies.length, intervalMs]);

  const movie = movies[current];

  return (
    <div className="w-full flex justify-center mt-10 px-4 mb-20">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-600 shadow-xl ring-1 ring-gray-500/50 bg-gradient-to-br from-zinc-900 to-black p-4">
        <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-black">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-contain object-center"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="text-white text-lg sm:text-xl font-semibold">
              {movie.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;