import React, { useContext } from "react";
import { timeFormat } from "../../lib/utils";
import { AppContext } from "../../context/AppContext";
import BlurCircle from "../../components/BlurCircle";
import { Heart, StarIcon, PlayCircle } from "lucide-react";

const MovieDetailsSection = ({ show, onShowTrailer }) => {
  const { toggleFavorite, isFavorited } = useContext(AppContext);

  return (
    <div className=' flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
      {/* Movie Poster */}
      <img
        src={show.movie.poster_path}
        alt='movie-poster'
        className=' max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
      />

      <div className=' relative flex flex-col gap-3'>
        <BlurCircle top='-100px' left='-100px' />

        {/* Language */}
        <p className=' text-primary'>English</p>

        {/* Title */}
        <div className='flex items-center gap-3 text-gray-300 mt-2'>
          <h1 className=' text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
            {/* Favorite (Heart icon) */}
          </h1>
          <div
            className='cursor-pointer transition-transform hover:scale-110'
            onClick={() => toggleFavorite(show.movie)}>
            {isFavorited(show.movie) ? (
              <Heart className='w-7 h-7 text-primary fill-current' />
            ) : (
              <Heart className='w-7 h-7 text-white' />
            )}
          </div>
        </div>

        {/* Ratings */}
        <div className='flex items-center gap-2'>
          <StarIcon className='w-5 h-5 text-primary fill-primary' />
          <span className='text-sm font-medium'>
            {show.movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Synopsis */}
        <p className=' text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
          {show.movie.overview}
        </p>

        {/* Runtime, genres, release date */}
        <p>
          {timeFormat(show.movie.runtime)} •{" "}
          {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
          {show.movie.release_date.split("-")[0]}
        </p>

        {/* Action Buttons */}
        <div className=' flex flex-wrap items-center gap-4 mt-4'>
          <button
            onClick={() => onShowTrailer(show.movie)}
            className=' flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
            <PlayCircle className=' w-5 h-5' />
            Watch Trailer
          </button>
          <a
            href='#dateSelect'
            className=' px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>
            Buy Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSection;
