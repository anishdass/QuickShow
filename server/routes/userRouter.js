import express from "express";
import {
  addUserFavorites,
  getBookings,
  getUserFavorites,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.get("/bookings", getBookings);
userRouter.get("/add-favorites", addUserFavorites);
userRouter.get("/get-favorites", getUserFavorites);
