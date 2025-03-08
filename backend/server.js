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

// | Import the authRouter from the authRoutes.js file
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

// | import chalk Log Styling
import { errorLog, successLog } from "./utils/consoleLog.js";

// | import error Handler Middleware
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

// ` Middleware configure
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// ` Configure route for the root URL
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// ` Configure error handler globally
app.use(errorHandlerMiddleware);

// @ Start the server on port 3000
const port = process.env.PORT || 3000;

// % Default route
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, (err) => {
  if (err) {
    errorLog("Error to start server" + " " + err);
  } else {
    successLog(`Example app listening on port ${port}!`);
  }
});
