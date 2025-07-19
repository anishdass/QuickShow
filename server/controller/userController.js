import { clerkClient } from "@clerk/express";
import { getUserBookings } from "../utils/utilsDB.js";
import Movie from "../models/Movie.js";

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

// API to add favorite movies
export const addUserFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;
    // const userId = req.auth().userId();
    const userId = process.env.TEST_USER;
    const user = await clerkClient.users.getUser(userId);

    let favorites = user.privateMetadata.favorites || [];

    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
    }

    user.privateMetadata.favorites = favorites;

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: user.privateMetadata,
    });

    return res.json({ success: true, message: "Favorite Added" });
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
    const user = await clerkClient.users.getUser(userId);
    const userFavorites = user.privateMetadata.favorites;
    const favoriteMovies = await Movie.find({ _id: { $in: userFavorites } });
    return res.json({ success: true, data: favoriteMovies });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Unable to get user favorites",
    });
  }
};
