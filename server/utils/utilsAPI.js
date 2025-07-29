import axios from "axios";

// Get now playing movies
export const getNowPlayingMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
    }
  );
  return response;
};

// Find trailer URL
export const findTrailerURL = async (data) => {
  const url = await axios.get(data);
  return url;
};

// get movie details
export const getMovieDetails = async (movieId) => {
  const movieDetails = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
  );
  return movieDetails;
};

// get cast details
export const getCastDetails = async (movieId) => {
  const movieCast = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
  );
  return movieCast;
};
