import express from "express";
import { addShows, getNowPlayingMovies } from "../controller/showController.js";

const showRouter = express.Router();

showRouter.get("/now-playing", getNowPlayingMovies);
showRouter.get("/add-shows", addShows);

export { showRouter };
