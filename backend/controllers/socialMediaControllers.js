import { ErrorHandler } from "../middlewares/errorHandler.js";
import SocialMediaModel from "../models/socialMediaSchema.js";
import UserModel from "../models/userSchema.js";

// + Add Social Media Controller
export const addSocialMediaController = async (req, res, next) => {
  try {
    const { socialMediaData } = req.body;

    // / get loggedIN user data
    const loggedInUser = req.user;

    // @ Check if the user is logged in
    const userExist = await UserModel.findById(loggedInUser.id);

    // # if user does not exist
    if (!userExist) {
      return next(new ErrorHandler(401, "User does note exist"));
    }

    const existing = await SocialMediaModel.findOne({
      userId: loggedInUser.id,
    });

    let updatedLinks;

    if (existing) {
      // Convert to map for easier merging
      const existingMap = {};
      existing.socialLinks.forEach(({ platform, url }) => {
        existingMap[platform] = url;
      });

      // Replace or add new values from incoming data
      socialMediaData.forEach(({ platform, url }) => {
        existingMap[platform] = url;
      });

      // Convert back to array of objects
      updatedLinks = Object.entries(existingMap).map(([platform, url]) => ({
        platform,
        url,
      }));
    } else {
      updatedLinks = socialMediaData; // First-time save
    }
    // + Create or Update social media document

    const userSocialMediaConnection = await SocialMediaModel.findOneAndUpdate(
      { userId: loggedInUser.id },
      { $set: { socialLinks: updatedLinks } },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Links updated",
      socialMediaDetails: userSocialMediaConnection,
    });
  } catch (error) {
    return next(error);
  }
};

// / Get Social Media Details for LoggedIn user
export const getSocialMediaController = async (req, res, next) => {
  try {
    const loggedInUser = req.user;
    const socialMediaDetails = await SocialMediaModel.findOne({
      userId: loggedInUser.id,
    }).populate("userId");

    // # if social Media details not exist
    if (!socialMediaDetails) {
      return next(new ErrorHandler(404, "Social Media details not found"));
    }

    return res.json({
      success: true,
      message: "Social Media Details",
      socialMediaDetails,
    });
  } catch (error) {
    next(error);
  }
};
