import React from "react";
import HeroSection from "../sections/Home/HeroSection";
import FeaturedSection from "../sections/Home/FeaturedSection";
import TrailerSection from "../sections/Home/TrailerSection";
import Movies from "../sections/Home/Movies";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TrailerSection />
    </div>
  );
};

export default Home;
