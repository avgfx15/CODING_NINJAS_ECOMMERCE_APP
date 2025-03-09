// | import express
import express from "express";

// | import authControllers
import {
  authSignInController,
  authSignUpController,
  authTestController,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// @ Define authRouter
const authRouter = express.Router();

// ` Cinfigure auth routes
authRouter.get("/test", authTestController);

// + New User signUp
authRouter.post("/signup", authSignUpController);
// / User signIn
authRouter.post("/signin", authSignInController);

// ~ Export authRouter
export default authRouter;
