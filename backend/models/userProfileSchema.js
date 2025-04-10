// | import mongoose
import mongoose from "mongoose";

// @ Declare the Schema of the Mongo model
const userProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      default: ["Male", "Female", "Other"],
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    location: {
      type: String,
    },
    profileImage: {
      url: String,
      public_id: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// ~ Export the model
const UserProfileModel = mongoose.model("UserProfile", userProfileSchema);

export default UserProfileModel;
