import Movie from "../models/Movie.js";
import Shows from "../models/Shows.js";

// Find movie
export const findMovie = async (movieId) => {
  let movie = await Movie.findById(movieId);
  return movie;
};

// Create Movie
export const addNewMovie = async (movieData) => {
  let movie = await Movie.create(movieData);
  return movie;
};

// Add Shows
export const addNewShows = async (showsData) => {
  await Shows.insertMany(showsData);
};
