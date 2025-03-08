import express from "express";
import { userTestController } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/test", userTestController);

userRouter.post("/signup");

export default userRouter;
