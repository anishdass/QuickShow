import express from "express";
import {
  addShows,
  getNowPlayingMovies,
  getAllUpcomingShows,
  getAllUpcomingShowsOf,
} from "../controller/showController.js";

export const showRouter = express.Router();

showRouter.get("/now-playing", getNowPlayingMovies);
showRouter.post("/add-shows", addShows);
showRouter.get("/all", getAllUpcomingShows);
showRouter.get("/:movieId", getAllUpcomingShowsOf);
