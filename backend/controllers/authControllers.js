// | import bcryptjs
import bcrypt from "bcryptjs";

// | import jsonwebtoken
import jwt from "jsonwebtoken";

// | import chalk Log Styling
import { ErrorHandler } from "../middlewares/errorHandler.js";
import UserModel from "../models/userSchema.js";
import { errorLog, infoLog } from "../utils/consoleLog.js";

// | import sendWelcomeEmail
import sendWelcomeEmail from "../config/mailer.js";

// / Auth Testing
export const authTestController = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Auth Route is working", success: true });
  } catch (error) {
    errorLog(error.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// + User SignUp
export const authSignUpController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // $ if email or password not entered
    if (!username || !email || !password) {
      return next(new ErrorHandler(400, "Please provide email and password"));
    }
    // $ Check user is Exist or not
    const userExist = await UserModel.findOne({ email });

    // $ if user Exist
    if (userExist) {
      return next(new ErrorHandler(401, "User already exists"));
    }

    // $ hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    // @ newUser with hashPassword
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
    });

    // $ user saved in DB
    const savedUser = await newUser.save();

    // $ Send a welcome email
    sendWelcomeEmail(email);

    // $ Send response to client
    return res.status(201).json({
      successStatus: true,
      message: `New user ${username} saved successfully!!!`,
    });
  } catch (error) {
    errorLog("Error to signUp user");
    return next(error);
  }
};

// + User SingIn
export const authSignInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email }).select("+password");

    if (!userExist) {
      return next(new ErrorHandler(401, "User not exists"));
    }

    const isMatched = await bcrypt.compareSync(password, userExist.password);

    if (!isMatched) {
      return next(new ErrorHandler(401, "Invalid Credentials"));
    }

    // @ create token with user data
    const token = await jwt.sign(
      {
        id: userExist.id,
        username: userExist.username,
        email: userExist.email,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // $ Destructure user Data to send via json without password
    const { password: _, ...withOutPassword } = userExist._doc;

    // Store Token in HttpOnly Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // $ Send response to client
    return res.status(201).json({
      successStatus: true,
      message: `User, ${userExist.username} logged in successfully!!!`,
      loggedInUser: withOutPassword,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

// + User SignOut
export const authLogoutController = async (req, res, next) => {
  try {
    console.log("Delete cookie");

    // $ Remove Cookie
    await res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({
      successStatus: true,
      message: `User logged out successfully!!!`,
    });
  } catch (error) {
    return next(error);
  }
};
