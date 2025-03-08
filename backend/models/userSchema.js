// | import mongoose
import mongoose from "mongoose";

// @ Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// @ Define userModel
const userModel = mongoose.model("User", userSchema);

// ~ Export the model
export default userModel;
