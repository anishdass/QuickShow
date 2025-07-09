import React from "react";
import { assets } from "../../../assets/assets";
import { ArrowRight, Calendar1Icon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      {/* Movie poster on the home page */}
      <img
        src={assets.marvelLogo}
        alt='logo'
        className=' max-h-11 lg:h-11 mt-20'
      />

      {/* Movie name  */}
      <h1 className=' text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>
        Guardians <br />
        Of the Galaxy
      </h1>

      {/* Genres, Year of release, runtime */}
      <div className=' flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi </span>
        <div className=' flex items-center gap-1'>
          <Calendar1Icon className=' w-4.5 h-4.5' /> 2018
        </div>
        <div className=' flex items-center gap-1'>
          <ClockIcon className=' w-4.5 h-4.5' /> 2h 8m
        </div>
      </div>

      {/* Synopsis */}
      <p className=' max-w-md text-gray-300'>
        Light years from Earth, 26 years after being abducted, Peter Quill finds
        himself the prime target of a manhunt after discovering an orb wanted by
        Ronan the Accuser.
      </p>
      <button
        className=' flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        onClick={() => navigate("/movies")}>
        Explore Movies
        <ArrowRight className=' w-5 h-5' />
      </button>
    </div>
  );
};

export default HeroSection;
