import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addSocialMediaController,
  deleteSocialMediaController,
  getAllUsersSocialConnectionForAdminController,
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

socialMediaRouter.get(
  "/alluserssocialconnection",
  authMiddleware,
  getAllUsersSocialConnectionForAdminController
);

// - delete social media connection
socialMediaRouter.delete(
  "/deletesocialmedia",
  authMiddleware,
  deleteSocialMediaController
);

export default socialMediaRouter;
