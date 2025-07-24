import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateSelect from "../sections/MovieDetails/DateSelect";
import { dummyTrailers } from "../assets/assets";
import CastSection from "../sections/MovieDetails/CastSection";
import MovieDetailsSection from "../sections/MovieDetails/MovieDetailsSection";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import RecommendedMovies from "../sections/MovieDetails/RecommendedMovies";

const MovieDetails = () => {
  const [show, setShow] = useState(null);
  const { id } = useParams();
  const { axios, upcomingShows } = useContext(AppContext);

  const onShowTrailer = (url) => {
    window.open(url);
  };

  console.log(upcomingShows);

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      const movie = data.data;
      const dateTime = data.dateTime;
      setShow({ movie, dateTime });
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to get shows");
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return (
    <>
      {show && (
        <div className=' px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
          {/* Movie Details Section*/}
          <MovieDetailsSection show={show} onShowTrailer={onShowTrailer} />

          {/* Cast Section */}
          <p className=' text-lg font-medium mt-20'>Cast</p>
          <CastSection show={show} />

          {/* Date section */}
          <DateSelect dateTime={show?.dateTime} id={id} />

          {/* Recommended Movies */}
          {upcomingShows.length > 1 && (
            <RecommendedMovies
              otherShows={upcomingShows.filter(
                (movie) => movie._id !== show.movie._id
              )}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MovieDetails;
