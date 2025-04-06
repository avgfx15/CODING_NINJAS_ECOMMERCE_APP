import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../middlewares/cloudinaryConfig.js"; // Cloudinary configuration

import UserProfileModel from "../models/userProfileSchema.js";

import { authMiddleware } from "../middlewares/authMiddleware.js"; //
import { ErrorHandler } from "../middlewares/errorHandler.js";

const uploadRouter = express.Router();

// Configure Multer & Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// API Route: Upload Image & Save URL in MongoDB

uploadRouter.post(
  "/profilepic",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res, next) => {
    try {
      const loggedInUser = req.user;

      if (!req.file) {
        return next(new ErrorHandler(400, "No file uploaded"));
      }

      const imageUrl = req.file.path; // Cloudinary image URL
      const public_id = req.file.filename; // Cloudinary public_id from CloudinaryStorage

      const findUser = await UserProfileModel.findOne({
        userId: loggedInUser.id,
      });

      if (!findUser) {
        return next(new ErrorHandler(404, "User not found"));
      }

      // Delete old image from Cloudinary if exists
      if (findUser.profileImage?.public_id) {
        await cloudinary.uploader.destroy(findUser.profileImage.public_id);
      }

      // Update user profile with new image data
      const updatedUser = await UserProfileModel.findOneAndUpdate(
        { userId: loggedInUser.id },
        {
          profileImage: {
            url: imageUrl,
            public_id,
          },
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Image uploaded successfully!",
        userProfile: updatedUser,
      });
    } catch (error) {
      console.error("Upload Error:", error);
      return next(new ErrorHandler(500, "Upload failed"));
    }
  }
);

export default uploadRouter;
