import Movie from "../models/Movie.js";
import Shows from "../models/Shows.js";
import Booking from "../models/Booking.js";

// Shows Calls
// Add Shows
export const addNewShows = async (showsData) => {
  await Shows.insertMany(showsData);
};

// Get all shows
export const getShows = async () => {
  const shows = await Shows.find({
    showDateTime: { $gte: new Date() },
  })
    .populate("movieId")
    .sort({ showDateTime: 1 });

  return shows;
};

// Get upcoming shows of a movie
export const getUpcomingShows = async (movieId) => {
  const upcomingShows = await Shows.find({
    movieId,
    showDateTime: { $gte: new Date() },
  });
  return upcomingShows;
};

// Get current show
export const getCurrentShow = async (showId) => {
  const currentShow = await Shows.findById(showId);
  return currentShow;
};

// Movies Calls
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

// Booking calls
// create booking
export const createBooking = (currentShow, selectedSeats, userId, showId) => {
  const booking = Booking.create({
    user: userId,
    show: showId,
    amount: currentShow.showPrice * selectedSeats.length,
    bookedSeat: selectedSeats,
  });
  return booking;
};
