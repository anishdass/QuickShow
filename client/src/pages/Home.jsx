import React from "react";
import HeroSection from "../components/sections/Home/HeroSection";
import FeaturedSection from "../components/sections/Home/FeaturedSection";
import TrailerSection from "../components/sections/Home/TrailerSection";
import Footer from "../components/sections/Footer";

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
