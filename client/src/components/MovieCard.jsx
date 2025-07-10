import { Heart, HeartIcon, StarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../lib/timeFormat";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const { favoriteMovies, setFavoriteMovies } = useContext(AppContext);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteMovies");
    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const isFavorited = favoriteMovies.some((fav) => fav._id === movie._id);

  const toggleFavorite = () => {
    if (isFavorited) {
      setFavoriteMovies(favoriteMovies.filter((fav) => fav._id !== movie._id));
    } else {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
      <div className='relative'>
        <img
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          src={movie.backdrop_path}
          alt=''
          className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
        />

        <div
          className='absolute top-2 right-2 cursor-pointer'
          onClick={toggleFavorite}>
          {isFavorited ? (
            <HeartIcon className='text-red-500' />
          ) : (
            <Heart className='text-white' />
          )}
        </div>
      </div>

      <p className='font-semibold mt-2 truncate'>{movie.title}</p>

      <p className='text-sm text-gray-400 mt-2'>
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        • {timeFormat(movie.runtime)} mins
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
