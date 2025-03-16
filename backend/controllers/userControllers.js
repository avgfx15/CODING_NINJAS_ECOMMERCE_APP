// | import chalk Log Styling
import { ErrorHandler } from "../middlewares/errorHandler.js";
import UserProfileModel from "../models/userProfileSchema.js";
import UserModel from "../models/userSchema.js";
import { errorLog } from "../utils/consoleLog.js";
import generateGoogleMapsUrl from "../utils/getLocationUrl.js";

// / User Testing
export const userTestController = async (req, res) => {
  try {
    res.status(200).json({ message: "User Route is working", success: true });
  } catch (error) {
    errorLog(error.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// + Add User Profile
export const addUserProfileController = async (req, res, next) => {
  try {
    // / Get LoggedIn User
    const loggedInUser = req.user;

    // % check user is exist or not
    const userExist = await UserModel.findById(loggedInUser.id);

    // % user does not exist
    if (!userExist) {
      return next(new ErrorHandler(401, "User does note exist"));
    }

    // @ get data from req.body
    const { name, mobile, age, gender, address, location, profileImage } =
      req.body;

    // % name & mobile must required
    if (!name || !mobile) {
      return next(new ErrorHandler(401, "Name & mobile must required"));
    }

    // + Create userProfile & save to DB
    const userProfile = new UserProfileModel({
      name,
      mobile,
      age,
      gender,
      address,
      location: address && (await generateGoogleMapsUrl(address)),
      profileImage,
      userId: loggedInUser.id,
    });
    // $ Profile saved
    const profileSaved = await userProfile.save();

    return res.status(201).json({
      message: `${userProfile.name} profile saved in database.`,
      user: profileSaved,
      successStatus: true,
    });
  } catch (error) {
    return next(error);
  }
};

// / Get User Profile By UserId
export const getUserProfileController = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const profileExist = await UserProfileModel.findOne({
      userId: loggedInUser.id,
    }).populate("userId");

    // %  You are not authorized
    if (!profileExist) {
      return next(new ErrorHandler(401, "You are not authorized"));
    }
    return res.status(200).json({
      successStatus: true,
      message: `${profileExist.name}'s profile data!!!`,
      userProfile: profileExist,
    });
  } catch (error) {
    return next(error);
  }
};

// / Get All Users Profile
export const getAllUsersUserProfileController = async (req, res, next) => {
  try {
    // @ loggedInUser variable
    const loggedInUser = req.user;

    // % Check user is Admin or not
    const userExist = await UserModel.findById(loggedInUser.id);

    // % User is not Admin
    if (userExist.role !== "Admin") {
      return next(new ErrorHandler(401, "You are not authorized"));
    }
    // $ User is Admin
    const allUsersProfile = await UserProfileModel.find().populate("userId");
    // ~ send response
    return res.status(200).json({
      successStatus: true,
      message: "All users profile data!!!",
      AllUsersProfile: allUsersProfile,
    });
  } catch (error) {
    return next(error);
  }
};

// / Get User Profile By Id By Admin User
export const getUserProfileByIdController = async (req, res, next) => {
  try {
    // @ loggedInUser variable
    const loggedInUser = req.user;

    // % Check user is Admin or not
    if (loggedInUser.role !== "Admin") {
      return next(new ErrorHandler(401, "You are not authorized"));
    }

    // $ Get user id from params
    const { id } = req.params;

    // % Check user id is valid or not and Profile is Exist or not
    const profileExist = await UserProfileModel.findById(id).populate("userId");

    // % Profile does not exist
    if (!profileExist) {
      return next(new ErrorHandler(401, "Profile does not exist"));
    }

    // ~ send response with userProfile
    return res.status(200).json({
      successStatus: true,
      message: `${profileExist.name}'s profile data!!!`,
      userProfile: profileExist,
    });
  } catch (error) {
    return next(error);
  }
};

// * Update User Profile By Own
export const updateUserProfileController = async (req, res, next) => {
  try {
    // @ loggedInUser variable
    const loggedInUser = req.user;

    // % Check user id is valid or not and Profile is Exist or not
    const profileExist = await UserProfileModel.findOne({
      userId: loggedInUser.id,
    }).populate("userId");

    // % Profile does not exist
    if (!profileExist) {
      return next(new ErrorHandler(401, "Profile does not exist"));
    }
    // ~ Update user profile
    const updatedProfile = await UserProfileModel.findOneAndUpdate(
      { userId: loggedInUser.id },
      req.body,
      {
        new: true,
      }
    );
    // ~ send response
    return res.status(200).json({
      successStatus: true,
      message: "Profile updated successfully!!!",
      userProfile: updatedProfile,
    });
  } catch (error) {
    return next(error);
  }
};

// - Delete User Profile and account By Own
export const deleteUserProfileController = async (req, res, next) => {
  try {
    // @ loggedInUser variable
    const loggedInUser = req.user;

    // % Check user
    const userExist = await UserModel.findOne({ _id: loggedInUser.id });
    // % User does not exist
    if (!userExist) {
      return next(new ErrorHandler(401, "User does not exist"));
    }
    // % Check user profile
    const profileExist = await UserProfileModel.findOne({
      userId: loggedInUser.id,
    });
    // % Profile does not exist
    if (!profileExist) {
      return next(new ErrorHandler(401, "Profile does not exist"));
    }
    // - Delete user profile and account
    await UserModel.deleteOne({ _id: loggedInUser.id });
    await UserProfileModel.deleteOne({ userId: loggedInUser.id });
    // ~ send response
    return res.status(200).json({
      successStatus: true,
      message:
        "Sorry to see you go!!!, Your profile and Account deleted successfully!!!",
    });
  } catch (error) {
    return next(error);
  }
};

// - Delete User BY Admin
export const deleteUserByAdminController = async (req, res, next) => {
  try {
    // @ loggedInUser variable
    const loggedInUser = req.user;

    // % Check loggedIn user is Admin
    if (loggedInUser.role != "Admin") {
      return next(
        new ErrorHandler(401, "You are not authorized to perform this action")
      );
    }

    // % Check user
    const userExist = await UserModel.findOne({ _id: req.params.id });
    // % User does not exist
    if (!userExist) {
      return next(new ErrorHandler(401, "User does not exist"));
    }
    // % Check user profile
    const profileExist = await UserProfileModel.findOne({
      userId: req.params.id,
    });
    // % Profile does not exist
    if (!profileExist) {
      return next(new ErrorHandler(401, "Profile does not exist"));
    }
    // - Delete user profile and account
    await UserModel.deleteOne({ _id: req.params.id });
    await UserProfileModel.deleteOne({ userId: req.params.id });
    // ~ send response
    return res.status(200).json({
      successStatus: true,
      message: "User deleted By Admin successfully!!!",
    });
  } catch (error) {
    return next(error);
  }
};
