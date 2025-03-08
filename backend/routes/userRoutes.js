// | import express
import express from "express";

// | import userControllers
import { userTestController } from "../controllers/userControllers.js";

//@ define userRouter
const userRouter = express.Router();

// ` Configure routes
userRouter.get("/test", userTestController);

userRouter.post("/signup");

// ~ export userRouter
export default userRouter;
