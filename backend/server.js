// ~ 1. Import the express module
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// ~ 2. Create an express app
const app = express();

import connectDB from "./config/dbConnect.js";
connectDB();
// ~ 3. Define a route for the root URL

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// ~ 4. Start the server on port 3000
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
