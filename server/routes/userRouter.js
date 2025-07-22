import express from "express";
import {
  addUserFavorites,
  addUserWatchlist,
  deleteUserFavorites,
  deleteUserWatchlist,
  getBookings,
  getUserData,
  getUserFavorites,
  getUserWatchlist,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.get("/bookings", getBookings);
userRouter.post("/get-user", getUserData);
userRouter.post("/add-favorites", addUserFavorites);
userRouter.post("/remove-favorites", deleteUserFavorites);
userRouter.get("/favorites", getUserFavorites);
userRouter.post("/add-watchlist", addUserWatchlist);
userRouter.post("/remove-watchlist", deleteUserWatchlist);
userRouter.get("/watchlist", getUserWatchlist);
