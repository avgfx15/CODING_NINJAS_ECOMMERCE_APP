// | import mongoose
import mongoose from "mongoose";

// @ Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["Customer", "Seller", "Admin"],
      default: "Customer",
    },
  },
  { timestamps: true }
);

// @ Define userModel
const UserModel = mongoose.model("User", userSchema);

// ~ Export the model
export default UserModel;
