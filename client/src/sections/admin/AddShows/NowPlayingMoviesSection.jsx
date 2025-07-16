import React from "react";
import { kConverter } from "../../../lib/utils";
import { StarIcon, CheckIcon } from "lucide-react";

const NowPlayingMoviesSection = ({
  nowPlayingMovies,
  selectedMovie,
  toggleSelectedMovie,
}) => {
  return (
    <div className=' overflow-x-auto pb-4'>
      <div className=' group flex flex-wrap gap-4 mt-4 w-max'>
        {nowPlayingMovies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => toggleSelectedMovie(movie._id)}
            className={` relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}>
            <div className=' relative rounded-lg overflow-hidden'>
              <img
                src={movie.poster_path}
                alt='poster'
                className=' w-full object-cover brightness-90'
              />
              {/* Rating and votes */}
              <div className=' text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                <p className=' flex items-center gap-1 text-gray-400'>
                  <StarIcon className=' w-4 h-4 text-primary fill-primary' />
                  {movie.vote_average.toFixed(1)}/5
                </p>
                <p className=' text-gray-300'>
                  {kConverter(movie.vote_count)} Votes
                </p>
              </div>
            </div>
            {selectedMovie === movie._id && (
              <div className=' absolute top-2 right-2 flex items-center justify-center bg-primary h6 w6 rounded'>
                <CheckIcon className=' w-4 h-4 text-white' strokeWidth='2.5' />
              </div>
            )}
            <p className=' font-medium truncate'>{movie.title}</p>
            <p className=' text-gray-400 text-sm'>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMoviesSection;
