import { getMovieData, getShowsData } from "../utils/utils.js";
import { addNewMovie, findMovie, addNewShows } from "../utils/utilsDB.js";
import { getCastDetails, getMovieDetails } from "../utils/utilsAPI.js";

const Authorization = `Bearer ${process.env.TMDB_API_KEY}`;

// Now Playing movies
export const getNowPlayingMovies = async (req, res) => {
  try {
    const response = getNowPlayingMovies();
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
      movie = getMovieData(movieDetails, movieCast);
      addNewMovie(movie);
    }

    // get shows data in Json format
    const showsData = getShowsData(showDateTimeData, movieId, showPrice);

    // add new shows if there is data in shows data
    if (showsData.length > 0) {
      await addNewShows(showsData);
    }
    res.json({ success: true, data: "Shows Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
