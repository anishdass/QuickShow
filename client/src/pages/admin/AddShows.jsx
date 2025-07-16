import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import NowPlayingMoviesSection from "../../sections/admin/AddShows/NowPlayingMoviesSection";
import DisplaySelectedTimeSection from "../../sections/admin/AddShows/DisplaySelectedTimeSection";
import DateAndTimeSection from "../../sections/admin/AddShows/DateAndTimeSection";
import PriceInputSection from "../../sections/admin/AddShows/PriceInPutSection";

const AddShows = () => {
  // get currency
  const currency = import.meta.env.VITE_CURRENCY;

  // useStates
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  // fetchNowPlayingMovies
  const fetchNowPlayingMovies = () => {
    setNowPlayingMovies(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  if (nowPlayingMovies.length > 0) {
    console.log(dateTimeSelection);
  }

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1={"Add"} text2={"Shows"} />

      <p className=' mt-10 text-lg font-medium'>Now playing movies</p>

      {/* Now Playing movies */}
      <NowPlayingMoviesSection
        nowPlayingMovies={nowPlayingMovies}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
      />

      {/* Price input */}
      <PriceInputSection
        showPrice={showPrice}
        currency={currency}
        setShowPrice={setShowPrice}
      />

      {/* Date and time selection */}
      <DateAndTimeSection
        dateTimeInput={dateTimeInput}
        setDateTimeInput={setDateTimeInput}
        handleDateTimeAdd={handleDateTimeAdd}
      />

      {/* Display selected time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <DisplaySelectedTimeSection
          dateTimeSelection={dateTimeSelection}
          handleRemoveTime={handleRemoveTime}
        />
      )}
      <button className=' bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
        Add Shows
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
