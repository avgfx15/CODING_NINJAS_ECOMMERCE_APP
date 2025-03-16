// | import express
import express from "express";

// | import userControllers
import {
  addUserProfileController,
  deleteUserProfileController,
  getAllUsersUserProfileController,
  getUserProfileByIdController,
  getUserProfileController,
  updateUserProfileController,
  userTestController,
  deleteUserByAdminController,
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

// / Get User Profile By Id
userRouter.get("/getprofile/:id", authMiddleware, getUserProfileByIdController);

// * Update User Profile By Own
userRouter.put("/updateprofile", authMiddleware, updateUserProfileController);

// - Delete Account with Profile
userRouter.delete(
  "/deleteaccount",
  authMiddleware,
  deleteUserProfileController
);

// - Delete User and User Profile By Admin
userRouter.delete(
  "/deleteuser/:id",
  authMiddleware,
  deleteUserByAdminController
);

// / Get All Users Profile
userRouter.get(
  "/getallusersprofile",
  authMiddleware,
  getAllUsersUserProfileController
);

// ~ export userRouter
export default userRouter;
