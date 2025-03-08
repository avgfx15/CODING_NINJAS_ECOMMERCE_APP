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

//Export the model
const userModel = mongoose.model("User", userSchema);

export default userModel;
