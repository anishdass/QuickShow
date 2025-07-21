import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import NowPlayingMoviesSection from "../../sections/admin/AddShows/NowPlayingMoviesSection";
import DisplaySelectedTimeSection from "../../sections/admin/AddShows/DisplaySelectedTimeSection";
import DateAndTimeSection from "../../sections/admin/AddShows/DateAndTimeSection";
import PriceInputSection from "../../sections/admin/AddShows/PriceInPutSection";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AddShows = () => {
  // get currency
  const currency = import.meta.env.VITE_CURRENCY;

  // useStates
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [buying, setBuying] = useState(false);
  const { axios } = useContext(AppContext);

  // fetchNowPlayingMovies
  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing");
      const movies = data.data.results;
      setNowPlayingMovies(movies);
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to fetch movies");
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      toast.error("Incorrect input");
      return;
    }

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) {
      toast.error("Incorrect input");
      return;
    }

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      console.log(prev);
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

  const toggleSelectedMovie = (movieId) => {
    if (selectedMovie === null) {
      setSelectedMovie(movieId);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleAddShows = async () => {
    try {
      setBuying(true);
      if (!showPrice || Object.keys(dateTimeSelection).length === 0) {
        toast.error("Missing Values");
      } else {
        const payLoad = {
          movieId: selectedMovie,
          showPrice,
          showDateTimeData: dateTimeSelection,
        };
        const { data } = await axios.post("/api/show/add-shows", payLoad);
        if (data.success) {
          toast.success("Shows added");
          setShowPrice("");
          setDateTimeSelection({});
          setDateTimeInput("");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to add shows");
    }
    setBuying(false);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1={"Add"} text2={"Shows"} />
      <p className=' mt-10 text-lg font-medium'>Now playing movies</p>

      {/* Now Playing movies */}
      <NowPlayingMoviesSection
        nowPlayingMovies={nowPlayingMovies}
        selectedMovie={selectedMovie}
        toggleSelectedMovie={toggleSelectedMovie}
      />

      {selectedMovie ? (
        <PriceInputSection
          showPrice={showPrice}
          currency={currency}
          setShowPrice={setShowPrice}
        />
      ) : (
        <></>
      )}

      {selectedMovie ? (
        <DateAndTimeSection
          dateTimeInput={dateTimeInput}
          setDateTimeInput={setDateTimeInput}
          handleDateTimeAdd={handleDateTimeAdd}
        />
      ) : (
        <></>
      )}

      {/* Display selected time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <DisplaySelectedTimeSection
          dateTimeSelection={dateTimeSelection}
          handleRemoveTime={handleRemoveTime}
        />
      )}

      {selectedMovie ? (
        <button
          onClick={handleAddShows}
          disabled={buying}
          className=' bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
          Add Shows
        </button>
      ) : (
        <></>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
