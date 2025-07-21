import { findUser, getUserBookings } from "../utils/utilsDB.js";

import User from "../models/User.js";

// API to get user bookings
export const getBookings = async (req, res) => {
  try {
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const bookings = await getUserBookings(userId);
    return res.json({ success: true, data: bookings });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Unable to get user bookings" });
  }
};

// API to get user data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Unable to get user" });
  }
};

// API to add to favorite movies
export const addUserFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    let favorites = user.favorites;
    if (favorites.includes(movieId)) {
      return res.json({ success: true, message: "Already Added" });
    } else {
      favorites.push(movieId);
      const userData = { favorites: favorites };
      await User.findByIdAndUpdate(userId, userData);
      return res.json({ success: true, message: "Favorite Added" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to add user favorites",
    });
  }
};

// API to delete from favorite movies
export const deleteUserFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    let favorites = user.favorites;
    if (favorites.includes(movieId)) {
      favorites = favorites.filter((favorite) => favorite !== movieId);
      const userData = { favorites: favorites };
      await User.findByIdAndUpdate(userId, userData);
      return res.json({ success: true, message: "Removed from favorites" });
    }
    return res.json({ success: true, message: "Not in favorites" });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to add user favorites",
    });
  }
};

// API to get favorite movies
export const getUserFavorites = async (req, res) => {
  try {
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    const favorites = user.favorites;
    return res.json({ success: true, data: favorites });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to get user favorites",
    });
  }
};
// API to add to favorite movies
export const addUserWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    let watchlist = user.watchlist;
    if (watchlist.includes(movieId)) {
      return res.json({ success: true, message: "Already Added" });
    } else {
      watchlist.push(movieId);
      const userData = { watchlist: watchlist };
      await User.findByIdAndUpdate(userId, userData);
      return res.json({ success: true, message: "Added to Watchlist" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to add to watchlist",
    });
  }
};

// API to delete from favorite movies
export const deleteUserWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    let watchlist = user.watchlist;
    if (watchlist.includes(movieId)) {
      watchlist = watchlist.filter((movie_id) => movie_id !== movieId);
      const userData = { watchlist: watchlist };
      await User.findByIdAndUpdate(userId, userData);
      return res.json({ success: true, message: "Removed from watchlist" });
    }
    return res.json({ success: true, message: "Not in watchlist" });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to add user watchlist",
    });
  }
};

// API to get favorite movies
export const getUserWatchlist = async (req, res) => {
  try {
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await findUser(userId);
    const watchlist = user.watchlist;
    return res.json({ success: true, data: watchlist });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to get user watchlist",
    });
  }
};
