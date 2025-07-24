import React, { useContext } from "react";
import MovieCard from "../../components/MovieCard";
import BlurCircle from "../../components/BlurCircle";
import { AppContext } from "../../context/AppContext";

const Movies = () => {
  const { upcomingShows } = useContext(AppContext);

  return (
    <div className=' relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />
      <h1 className=' text-lg font-medium my-4'>All Movies</h1>
      <div className=' flex flex-wrap max-sm:justify-center gap-8'>
        {upcomingShows.map((movie, index) => (
          <MovieCard key={movie._id || index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
