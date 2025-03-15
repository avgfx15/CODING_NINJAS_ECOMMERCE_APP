// | import express
import express from "express";

// | import userControllers
import {
  addUserProfileController,
  getAllUsersUserProfileController,
  getUserProfileController,
  userTestController,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//@ define userRouter
const userRouter = express.Router();

// ` Configure routes
userRouter.get("/test", userTestController);

// + Add userProfile
userRouter.post("/addprofile", authMiddleware, addUserProfileController);

// / Get User Profile
userRouter.get("/getprofile", authMiddleware, getUserProfileController);

// / Get All Users Profile
userRouter.get(
  "/getallusersprofile",
  authMiddleware,
  getAllUsersUserProfileController
);

// ~ export userRouter
export default userRouter;
