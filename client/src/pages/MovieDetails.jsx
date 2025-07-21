import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import DateSelect from "../sections/MovieDetails/DateSelect";
import { dummyTrailers } from "../assets/assets";
import CastSection from "../sections/MovieDetails/CastSection";
import MovieDetailsSection from "../sections/MovieDetails/MovieDetailsSection";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);

  const onShowTrailer = () => {
    window.open(dummyTrailers[0].videoUrl);
  };

  const getShow = () => {
    const movie = dummyShowsData.find((show) => show._id === id);
    console.log(movie);

    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className=' px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      {/* Movie Details Section*/}
      <MovieDetailsSection show={show} onShowTrailer={onShowTrailer} />

      {/* Cast Section */}
      <p className=' text-lg font-medium mt-20'>Cast</p>
      <CastSection show={show} />

      {/* Date section */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* Recommended Movies */}
      <p className='text-lg font-medium mt-20 mb-8'>You may also like</p>
      <div className=' flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className=' flex justify-center mt-20'>
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
  ) : (
    <Loading />
  );
};

export default MovieDetails;
