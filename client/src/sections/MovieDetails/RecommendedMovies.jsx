import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";

const RecommendedMovies = ({ otherShows }) => {
  const navigate = useNavigate();
  return (
    <>
      <p className='text-lg font-medium mt-20 mb-8'>You may also like</p>
      <div className=' flex flex-wrap max-sm:justify-center gap-8'>
        {otherShows.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className=' flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className=' px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
          Show More
        </button>
      </div>
    </>
  );
};

export default RecommendedMovies;
