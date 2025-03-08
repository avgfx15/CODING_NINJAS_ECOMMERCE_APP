// | import bcryptjs
import bcrypt from "bcryptjs";

// | import jsonwebtoken
import jwt from "jsonwebtoken";

// | import cooklie-parser
import cookieParser from "cookie-parser";

// | import chalk Log Styling
import { ErrorHandler } from "../middlewares/errorHandler.js";
import userModel from "../models/userSchema.js";
import { errorLog, infoLog } from "../utils/consoleLog.js";

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
    const { email, password } = req.body;

    // $ if email or password not entered
    if (!email || !password) {
      return next(new ErrorHandler(400, "Please provide email and password"));
    }
    // $ Check user is Exist or not
    const userExist = await userModel.findOne({ email });

    // $ if user Exist
    if (userExist) {
      return next(new ErrorHandler(401, "User already exists"));
    }

    // $ hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    // @ newUser with hashPassword
    const newUser = new userModel({
      email,
      password: hashPassword,
    });

    // $ user saved in DB
    const savedUser = await newUser.save();

    // @ create token with user data
    const token = await jwt.sign(
      { id: savedUser.id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // $ Destructure user Data to send via json without password
    const { password: _, ...withOutPassword } = savedUser._doc;

    // $ Send response to client
    return res.status(201).json({
      successStatus: true,
      message: `New user ${email} saved successfully!!!`,
      newUser: withOutPassword,
      token,
    });
  } catch (error) {
    errorLog("Error to signUp user");
    return next(error);
  }
};
