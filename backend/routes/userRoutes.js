// | import express
import express from "express";

// | import userControllers
import {
  addUserProfileController,
  userTestController,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//@ define userRouter
const userRouter = express.Router();

// ` Configure routes
userRouter.get("/test", userTestController);

// + Add userProfile
userRouter.post("/addprofile", authMiddleware, addUserProfileController);

// ~ export userRouter
export default userRouter;
