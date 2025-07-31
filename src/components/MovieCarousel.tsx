
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { IMovie } from '../utils/util';



interface MovieCarouselProps {
  movies: IMovie[];
}

const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-600 shadow-xl ring-1 ring-gray-500/50 bg-gradient-to-br from-zinc-900 to-black p-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          style={{ paddingBottom: '2rem' }}
        >
          {movies.map((movie, i) => (
            <SwiperSlide
              key={`carousel-movie-${i}`}
              className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] rounded-xl overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <h3 className="text-white text-lg sm:text-xl font-semibold">{movie.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-4 text-center text-gray-300 text-sm">
          Showing {movies.length} movies
        </p>
      </div>
    </div>
  );
};




export default MovieCarousel;
