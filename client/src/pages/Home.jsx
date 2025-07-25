import React, { useContext } from "react";
import HeroSection from "../sections/Home/HeroSection";
import FeaturedSection from "../sections/Home/FeaturedSection";
import TrailerSection from "../sections/Home/TrailerSection";
import Movies from "../sections/Home/Movies";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";

const Home = () => {
  const { upcomingShows } = useContext(AppContext);
  return (
    <>
      {upcomingShows.length > 0 ? (
        <div>
          <HeroSection />
          <FeaturedSection />
          <TrailerSection />
          <Movies />
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center text-gray-400 text-xl font-medium'>
          No Shows to display
        </div>
      )}
    </>
  );
};

export default Home;
