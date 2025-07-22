import { Clock, Heart, StarIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "../lib/utils";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const [favorite, setFavorite] = useState("");
  const [watchlist, setWatchlist] = useState("");
  const navigate = useNavigate();
  const { axios, user } = useContext(AppContext);

  const toggleFavorite = async (movie) => {
    if (favorite === "") {
      setFavorite(movie._id);
      const { data } = await axios.post("/api/user/add-favorites", {
        movieId: movie._id,
        userId: user._id,
      });
      toast.success(data.message);
    } else {
      setFavorite("");
      const { data } = await axios.post("/api/user/remove-favorites", {
        movieId: movie._id,
        userId: user._id,
      });
      toast.error(data.message);
    }
  };

  const toggleWatchlist = async (movie) => {
    if (watchlist === "") {
      setWatchlist(movie._id);
      const { data } = await axios.post("/api/user/add-watchlist", {
        movieId: movie._id,
        userId: user._id,
      });
      toast.success(data.message);
    } else {
      setWatchlist("");
      const { data } = await axios.post("/api/user/remove-watchlist", {
        movieId: movie._id,
        userId: user._id,
      });
      toast.error(data.message);
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
          alt=''
          className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
        />

        <div className='absolute top-2 left-2 right-2 z-10 flex justify-between items-center px-2'>
          {/* Watchlist Icon (Clock) */}
          <div
            className={`bg-white/10 backdrop-blur-sm p-1.5 rounded-full cursor-pointer
          ${
            watchlist === movie._id
              ? "hover:bg-yellow-500/20"
              : "hover:bg-white/20"
          }`}
            onClick={() => toggleWatchlist(movie)}>
            <Clock
              className={`w-5 h-5 transition 
        ${
          watchlist === movie._id
            ? " text-white fill-orange-500"
            : "text-white hover:text-orange-400"
        }`}
            />
          </div>

          {/* Favorite Icon (Heart) */}
          <div
            className={`bg-white/10 backdrop-blur-sm p-1.5 rounded-full cursor-pointer
          ${
            favorite === movie._id ? "hover:bg-red-500/20" : "hover:bg-white/20"
          }`}
            onClick={() => toggleFavorite(movie)}>
            <Heart
              className={`w-5 h-5 transition 
        ${
          favorite === movie._id
            ? "fill-red-500 text-red-500"
            : "text-white hover:text-red-400"
        }`}
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
