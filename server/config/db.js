import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/QuickShow`);
  } catch (error) {
    console.log(error.message);
  }
};
