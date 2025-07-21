import Movie from "../models/Movie.js";
import Shows from "../models/Shows.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

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
export const bookTickets = (currentShow, selectedSeats, userId, showId) => {
  const booking = Booking.create({
    user: userId,
    show: showId,
    amount: currentShow.showPrice * selectedSeats.length,
    bookedSeat: selectedSeats,
  });
  return booking;
};

// get booking
export const getBookings = async () => {
  const bookings = await Booking.find({})
    .populate("user")
    .populate({ path: "show", populate: { path: "movieId" } })
    .sort({ createdAt: -1 });
  return bookings;
};

// paid booking
export const getPaidBookings = async () => {
  const bookings = await Booking.find({ isPaid: true });
  return bookings;
};

// user calls
// count users
export const getUsers = async () => {
  const totalUsers = await User.countDocuments();
  return totalUsers;
};

// get User Booking
export const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId })
    .populate({ path: "show", populate: { path: "movieId" } })
    .sort({ createdAt: -1 });
  return bookings;
};

export const findUser = async (userId) => {
  let user = await User.findById(userId);
  return user;
};