import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`.bgGreen.black);
  } catch (error) {
    console.log(`MongoDB connection error:`.bgRed.white, error);
    process.exit(1);
  }
};

export default connectDB;
