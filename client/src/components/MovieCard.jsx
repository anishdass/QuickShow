import { Heart, StarIcon } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../lib/utils";
import { AppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const { favoriteIds, toggleFavorite, tmdb_img_url } = useContext(AppContext);

  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
      <div className='relative'>
        <img
          onClick={() => {
            navigate(`/show/${movie._id}`);
            scrollTo(0, 0);
          }}
          src={`${tmdb_img_url}${movie.poster_path}`}
          alt={movie.title}
          className='rounded-lg  w-full object-cover object-right-bottom cursor-pointer'
        />

        <div className='absolute top-2 right-2  z-10 flex justify-between items-center px-2'>
          <div
            className='bg-white/10 backdrop-blur-sm p-1.5 rounded-full cursor-pointer'
            onClick={() => toggleFavorite(movie._id)}>
            <Heart
              className={`w-5 h-5 transition ${
                favoriteIds.includes(movie._id)
                  ? "fill-red-500 text-red-500"
                  : "text-white hover:text-red-400"
              } `}
            />
          </div>
        </div>
      </div>

      <p className='font-semibold mt-2 truncate'>{movie.title}</p>

      <p className='text-sm text-gray-400 mt-2'>
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        • {timeFormat(movie.runtime)}
      </p>

      <div className='flex items-center justify-between mt-4 pb-3'>
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Book Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary' />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
