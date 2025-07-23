import { Heart, StarIcon } from "lucide-react";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../lib/utils";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { getUserData } from "../../../server/controller/userController";

const MovieCard = ({ movie }) => {
  const { user, axios, getUserData } = useContext(AppContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFavoriteIds(user.favorites.map((favorite) => favorite._id));
    }
  }, [user]);

  const toggleFavorite = async (movieId) => {
    try {
      if (favoriteIds?.includes(movieId)) {
        setFavoriteIds(favoriteIds.filter((id) => id !== movieId));
        await axios.post("/api/user/remove-favorites", {
          movieId,
        });
        toast.error("Removed from favorites");
      } else {
        setFavoriteIds([...favoriteIds, movieId]);
        await axios.post("/api/user/add-favorites", {
          movieId,
        });
        toast.success("Favorites Updated");
      }
      await getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
      <div className='relative'>
        <img
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
        />

        <div className='absolute top-2 right-2  z-10 flex justify-between items-center px-2'>
          {/* Favorite Icon (Heart) */}
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
