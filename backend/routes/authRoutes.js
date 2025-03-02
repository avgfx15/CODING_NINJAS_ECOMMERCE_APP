import express from "express";
import { authTestController } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.get("/test", authTestController);
export default authRouter;
