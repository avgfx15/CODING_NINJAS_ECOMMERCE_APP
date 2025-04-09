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

    // + Create or Update social media document

    const userSocialMediaConnection = await SocialMediaModel.findOneAndUpdate(
      { userId: loggedInUser.id },
      { $set: { socialLinks: socialMediaData } },
      { new: true, upsert: true } // this creates if not exists
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
