import mongoose from "mongoose";

const showsSchema = mongoose.Schema(
  {
    movieId: { type: String, required: true, ref: "Movie" },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  { minimize: false }
);

const Shows = mongoose.model("Shows", showsSchema);

export default Shows;
