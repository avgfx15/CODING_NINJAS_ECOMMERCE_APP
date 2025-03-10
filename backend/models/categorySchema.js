// | import mongoose

import mongoose from "mongoose";

// @ Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

// ~ Export the model
const categoryModel = mongoose.model("Category", categorySchema);
