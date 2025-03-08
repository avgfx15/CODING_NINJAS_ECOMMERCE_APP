// | import mongoose
import mongoose from "mongoose";

// | import chalk Log Styling
import { errorLog, successLog } from "../utils/consoleLog.js";

// | import dotenv
import dotenv from "dotenv";
dotenv.config();

// @ Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    successLog("MongoDB is Connected...");
  } catch (error) {
    errorLog(error.message);
    process.exit(1);
  }
};

// ~ export connection DB function
export default connectDB;
