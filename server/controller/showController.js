import { getMovieData, getShowsData } from "../utils/utils.js";
import {
  addNewMovie,
  findMovie,
  addNewShows,
  getShows,
  getUpcomingShows,
} from "../utils/utilsDB.js";
import {
  getCastDetails,
  getMovieDetails,
  findTrailerURL,
} from "../utils/utilsAPI.js";
import axios from "axios";
import { inngest } from "../inngest/index.js";

const Authorization = `Bearer ${process.env.TMDB_API_KEY}`;
const youtube_api_key = process.env.YOUTUBE_API_KEY;

// Now Playing movies
export const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: { Authorization },
      }
    );
    return res.json({ success: true, data: response.data });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, data: error.message });
  }
};

// Add new show to the database
export const addShows = async (req, res) => {
  try {
    const { movieId, showPrice, showDateTimeData } = req.body;

    // find movie if it exists
    let movie = await findMovie(movieId);

    // Add movie if it doesn't
    if (!movie) {
      const movieDetails = await getMovieDetails(movieId);
      const movieCast = await getCastDetails(movieId);

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${
        movieDetails.data.title
      }%${
        movieDetails.data.release_date.split("-")[0]
      }%20official%20trailer&type=video&maxResults=1&key=${youtube_api_key}`;

      let trailerData = await findTrailerURL(url);
      movie = getMovieData(movieDetails, movieCast, trailerData);
      addNewMovie(movie);
    }

    // get shows data in Json format
    const showsData = getShowsData(showDateTimeData, movieId, showPrice);

    // add new shows if there is data in shows data
    if (showsData.length > 0) {
      await addNewShows(showsData);
    }

    // Trigger inggest event
    await inngest.send({
      name: "app/show.added",
      data: { movieTitle: movie.title },
    });

    res.json({ success: true, data: "Shows Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all the upcoming shows from the database
export const getAllUpcomingShows = async (req, res) => {
  try {
    const shows = await getShows();

    // Filter uniques shows
    const uniqueShows = new Set(shows.map((show) => show.movieId));

    return res.json({ success: true, data: Array.from(uniqueShows) });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: true, data: error.message });
  }
};

// API to get all the upcoming shows of a movie from the database
export const getAllUpcomingShowsOf = async (req, res) => {
  try {
    // Movie Id
    const { movieId } = req.params;
    // Movie
    const movie = await findMovie(movieId);
    // Upcoming shows for the particular movie
    const upcomingShows = await getUpcomingShows(movieId);

    const dateTime = {};
    upcomingShows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    return res.json({ success: true, data: movie, dateTime });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: true, data: error.message });
  }
};
