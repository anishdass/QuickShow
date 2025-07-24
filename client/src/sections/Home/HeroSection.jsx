import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { ArrowRight, Calendar1Icon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { timeFormat } from "../../lib/utils";

const HeroSection = () => {
  const navigate = useNavigate();
  const { upcomingShows, tmdb_img_url } = useContext(AppContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        upcomingShows.length ? (prev + 1) % upcomingShows.length : 0
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [upcomingShows]);

  if (!upcomingShows.length) return null;

  const show = upcomingShows[index];
  const backgroundUrl = `${tmdb_img_url}${show.backdrop_path}`;

  return (
    <div
      className='relative h-screen bg-cover bg-center transition-all duration-1000'
      style={{ backgroundImage: `url(${backgroundUrl})` }}>
      {/* Overlay with blur & dark tint */}
      <div className='absolute inset-0 bg-black/70' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-36 gap-4'>
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 text-white'>
          {show.title}
        </h1>

        <div className='flex items-center gap-4 text-gray-300'>
          <span>{show.genres?.map((g) => g.name).join(" | ")}</span>
          <div className='flex items-center gap-1'>
            <Calendar1Icon className='w-4.5 h-4.5' />
            {show.release_date?.split("-")[0]}
          </div>
          <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5' />
            {timeFormat(show.runtime)}
          </div>
        </div>

        <p className='max-w-md text-gray-300 line-clamp-4'>{show.overview}</p>

        <button
          className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
          onClick={() => navigate("/movies")}>
          Explore Movies
          <ArrowRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
