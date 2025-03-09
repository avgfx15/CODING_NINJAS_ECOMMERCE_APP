// | import jwt
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./errorHandler.js";

// @ authMiddleware

export const authMiddleware = async (req, res, next) => {
  try {
    // % Access token from cookies
    const token = req.cookies.authToken;
    // $ If no token
    if (!token) {
      return next(ErrorHandler(401, "Unauthorized: No token provided"));
    }
    // @ Get User if token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};
