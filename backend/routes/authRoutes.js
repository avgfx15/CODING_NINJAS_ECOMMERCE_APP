// | import express
import express from "express";

// | import authControllers
import {
  authLogoutController,
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
// - User Logout
authRouter.post("/logout", authMiddleware, authLogoutController);

// ~ Export authRouter
export default authRouter;
