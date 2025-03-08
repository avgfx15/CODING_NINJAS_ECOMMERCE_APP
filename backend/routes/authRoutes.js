// | import express
import express from "express";

// | import authControllers
import {
  authSignUpController,
  authTestController,
} from "../controllers/authControllers.js";

// @ Define authRouter
const authRouter = express.Router();

// ` Cinfigure auth routes
authRouter.get("/test", authTestController);

// + New User signUp
authRouter.post("/signup", authSignUpController);

// ~ Export authRouter
export default authRouter;
