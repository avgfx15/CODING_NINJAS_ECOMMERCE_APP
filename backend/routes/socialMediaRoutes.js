import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addSocialMediaController,
  getSocialMediaController,
} from "../controllers/socialMediaControllers.js";

const socialMediaRouter = express.Router();

socialMediaRouter.put(
  "/addsocialmedia",
  authMiddleware,
  addSocialMediaController
);

socialMediaRouter.get(
  "/getsocialmedia",
  authMiddleware,
  getSocialMediaController
);

export default socialMediaRouter;
