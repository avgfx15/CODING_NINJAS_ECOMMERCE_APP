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

    const userExist = await UserModel.findById(loggedInUser.id);
  } catch (error) {
    return next(error);
  }
};
