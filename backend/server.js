// | Import the express module
import express from "express";

// | import cors
import cors from "cors";

// | import dotenv
import dotenv from "dotenv";

// @ Create an express app
const app = express();

// | Import the connectDB function from the dbConnect.js file
import connectDB from "./config/dbConnect.js";
connectDB();

// | import cooklie-parser
import cookieParser from "cookie-parser";

// | Import the authRouter from the authRoutes.js file
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

// | import chalk Log Styling
import { errorLog, successLog } from "./utils/consoleLog.js";

// | import error Handler Middleware
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import uploadRouter from "./routes/uploadRoutes.js";
import socialMediaRouter from "./routes/socialMediaRoutes.js";

// ` Middleware configure
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// | Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both ports
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
// | Configure cookie-parser
app.use(cookieParser());
dotenv.config();

// ` Configure route for the root URL
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
// ` Configure route for the upload URL
app.use("/api/v1/upload", uploadRouter);
// ^ Social Media Router
app.use("/api/v1/social", socialMediaRouter);

// ` Configure error handler globally
app.use(errorHandlerMiddleware);

// @ Start the server on port 3000
const port = process.env.PORT || 3150;

// % Default route
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, (err) => {
  if (err) {
    errorLog("Error to start server" + " " + err);
  } else {
    successLog(`Example app listening on port ${port}!`);
  }
});
