import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Favorite = () => {
  const { user } = useContext(AppContext);
  let [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites);
    }
  }, [user]);

  console.log(user);

  return favorites.length > 0 ? (
    <div className=' relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />
      <h1 className=' text-lg font-medium my-4'>Favorites</h1>
      <div className=' flex flex-wrap max-sm:justify-center gap-8'>
        {user.favorites.map((movie, index) => (
          <MovieCard key={movie._id || index} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className=' flex flex-col items-center justify-center h-screen'>
      <h1 className=' text-3xl font-bold text-center'>No Movies in Favorite</h1>
      <button
        className=' flex items-center gap-1 px-6 py-3 mt-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        onClick={() => navigate("/movies")}>
        Explore Movies
        <ArrowRight className=' w-5 h-5' />
      </button>
    </div>
  );
};

export default Favorite;
