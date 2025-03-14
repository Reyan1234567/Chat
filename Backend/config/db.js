import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
export const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb")
  } catch (err) {
    console.log(`couldn't connect to mongodb, Error: ${err}`);
  }
};
