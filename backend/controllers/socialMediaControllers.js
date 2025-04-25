import { ErrorHandler } from "../middlewares/errorHandler.js";
import SocialMediaModel from "../models/socialMediaSchema.js";
import UserModel from "../models/userSchema.js";

// + Add & Updates Social Media Controller
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
    // @ Check if loggedIn User's social media data already exists
    const existing = await SocialMediaModel.findOne({
      userId: loggedInUser.id,
    });

    let updatedLinks;

    if (existing) {
      // % Convert to map for easier merging
      const existingMap = {};
      existing.socialLinks.forEach(({ platform, url }) => {
        existingMap[platform] = url;
      });

      // % Replace or add new values from incoming data
      socialMediaData.forEach(({ platform, url }) => {
        existingMap[platform] = url;
      });

      // % Convert back to array of objects
      updatedLinks = Object.entries(existingMap).map(([platform, url]) => ({
        platform,
        url,
      }));
    } else {
      // @ If no existing data, use the incoming data directly
      // First-time save
      updatedLinks = socialMediaData;
    }

    // + Create or Update social media document

    const userSocialMediaConnection = await SocialMediaModel.findOneAndUpdate(
      { userId: loggedInUser.id },
      { $set: { socialLinks: updatedLinks } },
      { new: true, upsert: true }
    );

    return res.json({
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
    return next(error);
  }
};

// / Get Social Medica Details for All Users For Admin
export const getAllUsersSocialConnectionForAdminController = async (
  req,
  res,
  next
) => {
  try {
    // @ Get LoggedInUser Data

    const loggedInUser = req.user;

    // % Check user is Admin or not
    if (loggedInUser.role !== "Admin") {
      return next(
        new ErrorHandler(403, "You are not authorized to access this resource")
      );
    }

    const socialMediaDetails = await SocialMediaModel.find().populate("userId");
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
    return next(error);
  }
};

// - Delete Social Media Details for LoggedIn user
export const deleteSocialMediaController = async (req, res, next) => {
  try {
    const { platformsToDelete } = req.body;

    console.log(platformsToDelete + " backend platforms to delete");
    // @ Get LoggedInUser Data
    const loggedInUser = req.user;

    const socialMediaDetails = await SocialMediaModel.findOne({
      userId: loggedInUser.id,
    });

    // # if social Media details not exist
    if (!socialMediaDetails) {
      return next(new ErrorHandler(404, "Social Media details not found"));
    }
    const updated = await SocialMediaModel.findOneAndUpdate(
      { userId: loggedInUser.id },
      { $pull: { socialLinks: { platform: { $in: platformsToDelete } } } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Selected platforms deleted",
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};
// / Delete Social Media Details for All Users For Admin
