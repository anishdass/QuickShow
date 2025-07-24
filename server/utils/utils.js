import { getCurrentShow } from "./utilsDB.js";

export const getMovieData = (movieDetails, movieCast, trailerData) => {
  const videoUrl =
    process.env.YOUTUBE_TRAILER_PREFIX + trailerData.data.items[0].id.videoId;
  const thumbnail =
    trailerData.data.items[0].snippet.thumbnails.default.url.replace(
      "/default",
      "/maxresdefault",
      -1
    );

  const movieData = {
    _id: movieDetails.data.id,
    title: movieDetails.data.original_title,
    overview: movieDetails.data.overview,
    poster_path: movieDetails.data.poster_path,
    backdrop_path: movieDetails.data.backdrop_path,
    release_date: movieDetails.data.release_date,
    original_language: movieDetails.data.original_language,
    tagline: movieDetails.data.tagline,
    genres: movieDetails.data.genres,
    casts: movieCast.data.cast,
    vote_average: movieDetails.data.vote_average,
    runtime: movieDetails.data.runtime,
    adult: movieDetails.data.adult,
    videoUrl: videoUrl,
    thumbnail: thumbnail,
  };
  return movieData;
};

export const getShowsData = (showDateTimeData, movieId, showPrice) => {
  let showsData = [];
  let showTimings = "";
  Object.keys(showDateTimeData).forEach((date) =>
    showDateTimeData[date].forEach((time) => {
      showTimings = `${date}T${time}`;
      showsData.push({
        movieId,
        showDateTime: new Date(showTimings),
        showPrice,
        occupiedSeats: {},
      });
    })
  );
  return showsData;
};

// Function to check availabilty of selected Seats
export const checkAvailabilityOfSelectedSeats = async (
  selectedSeats,
  showId
) => {
  try {
    const currentShow = await getCurrentShow(showId);

    if (!currentShow) {
      return res.json({ success: false, message: "Incorrect show" });
    }

    const occupiedSeats = currentShow.occupiedSeats;

    const isAnySeatOccupied = selectedSeats.some((seat) => occupiedSeats[seat]);
    return isAnySeatOccupied;
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error checking seat availability",
    });
  }
};
