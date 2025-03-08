// | import express
import express from "express";

// | import authControllers
import { authTestController } from "../controllers/authControllers.js";

// @ Define authRouter
const authRouter = express.Router();

// ` Cinfigure auth routes
authRouter.get("/test", authTestController);

// ~ Export authRouter
export default authRouter;
