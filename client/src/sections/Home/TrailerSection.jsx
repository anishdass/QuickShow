import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "../../components/BlurCircle";
import { PlayCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const TrailerSection = () => {
  const { upcomingShows } = useContext(AppContext);
  const [currentMovie, setCurrentMovie] = useState(upcomingShows[0]);
  const [otherMovies, setOtherMovies] = useState(upcomingShows.slice(1));

  return (
    <>
      {upcomingShows.length > 0 && (
        <div className=' px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
          {/* Heading */}
          <p className=' text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
            Trailers
          </p>

          {/* Main trailer */}
          <div className=' relative mt-6'>
            <BlurCircle top='-100px' right='-100px' />
            <ReactPlayer
              src={currentMovie.videoUrl}
              controls={false}
              className=' mx-auto max-w-full'
              width='960px'
              height='540px'
            />

            {/* Other trailers */}
            <div className=' group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
              {otherMovies.map((movie) => (
                <div
                  onClick={() => {
                    setCurrentMovie(movie);
                    setOtherMovies(
                      upcomingShows.filter(
                        (otherMovie) => otherMovie.videoUrl !== movie.videoUrl
                      )
                    );
                  }}
                  key={movie.thumbnail}
                  className=' relative group-hover:not-hover:opacity-50 hover:translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'>
                  <img
                    src={movie.thumbnail}
                    alt='trailer-image'
                    className=' rounded-lg w-full h-full object-cover brightness-75'
                  />
                  <PlayCircle className=' absolute top-1/2 left1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2' />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerSection;
