import { ArrowRight } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../../components/BlurCircle";
import MovieCard from "../../components/MovieCard";
import { AppContext } from "../../context/AppContext";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { upcomingShows } = useContext(AppContext);

  return (
    <div className=' px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      {/* Section Heading, and view all button */}
      <div className=' relative flex items-center justify-between pt-20 pb-10'>
        <BlurCircle top='0' right='-80px' />
        <p className=' text-gray-300 font-medium text-lg'>Now Showing</p>
        <button
          className=' group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'
          onClick={() => navigate("/movies")}>
          View All
          <ArrowRight className=' group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
        </button>
      </div>

      {/* Featured Movies */}
      <div className=' flex items-center gap-8 mt-8 max-sm:justify-center'>
        {upcomingShows?.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Show more button */}
      <div className='flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className=' px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
