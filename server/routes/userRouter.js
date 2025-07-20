import express from "express";
import {
  addUserFavorites,
  addUserWatchlist,
  deleteUserFavorites,
  deleteUserWatchlist,
  getBookings,
  getUserFavorites,
  getUserWatchlist,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.get("/bookings", getBookings);
userRouter.get("/add-favorites", addUserFavorites);
userRouter.get("/remove-favorites", deleteUserFavorites);
userRouter.get("/favorites", getUserFavorites);
userRouter.get("/add-watchlist", addUserWatchlist);
userRouter.get("/remove-watchlist", deleteUserWatchlist);
userRouter.get("/watchlist", getUserWatchlist);
