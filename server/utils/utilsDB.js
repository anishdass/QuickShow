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
  const currentShow = await Shows.findById(showId).populate("movieId");
  return currentShow;
};

// Find shows by Id
export const findShowsById = async (id) => {
  const show = await Shows.findById(id);
  return show;
};

// Populated shows
export const populatedShows = async (windowStart, in8Hours) => {
  const shows = await Shows.find({
    showDateTime: { $gte: windowStart, $lte: in8Hours },
  }).populate("movieId");
};

// Movies Calls
// Find movie
export const findMovie = async (movieId) => {
  let movie = await Movie.findById(movieId);
  return movie;
};

// Create Movie
export const addNewMovie = async (movieData) => {
  await Movie.create(movieData);
};

// Booking calls
// create booking
export const bookTickets = async (
  currentShow,
  selectedSeats,
  userId,
  showId
) => {
  const booking = await Booking.create({
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
    .populate({
      path: "show",
      populate: { path: "movieId" },
    })
    .sort({ createdAt: -1 });
  return bookings;
};

// get bookings by id
export const getBookingsById = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  return booking;
};

// Delete booking
export const deleteBooking = async (bookingId) => {
  await Booking.findByIdAndDelete(bookingId);
};

// paid booking
export const getPaidBookings = async () => {
  const bookings = await Booking.find({ isPaid: true });
  return bookings;
};

// Populated booking
export const getPopulatedBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate("user")
    .populate({ path: "show", populate: { path: "movieId" } });
  return booking;
};

// User calls
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

// Find user
export const findUser = async (userId) => {
  let user = await User.findById(userId);
  return user;
};

// Find user for favorites
export const findUserForFavorites = async (userId) => {
  let user = await User.findById(userId).populate("favorites");
  return user;
};

// Create user
export const createUser = async (userData) => {
  await User.create(userData);
};

// Find by Id and delete
export const findUserByIdAndDelete = async (id) => {
  await User.findByIdAndDelete(id);
};

// Find by Id and update
export const findUserByIdAndUpdate = async (id) => {
  await User.findByIdAndUpdate(id, userData);
};

// Find User in userIds
export const findUserInUserIds = async (userIds) => {
  const user = await User.find({ _id: { $in: userIds } }).select("name email");
  return user;
};

// Get all users
export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};
