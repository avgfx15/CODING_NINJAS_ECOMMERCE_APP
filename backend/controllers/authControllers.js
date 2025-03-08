// | import chalk Log Styling
import { errorLog } from "../utils/consoleLog.js";

// / Auth Testing
export const authTestController = async (req, res) => {
  try {
    res.status(200).json({ message: "Auth Route is working", success: true });
  } catch (error) {
    errorLog(error.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// + User SignUp
export const authSignUpController = async (req, res) => {};
