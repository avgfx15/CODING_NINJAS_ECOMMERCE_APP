// | import mogoose
import mongoose from "mongoose";

// @ Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productImage: {
      type: String,
    },
    colorVariants: {
      type: [String],
      default: ["Blue", "Silver", "Black"],
    },
    size: {
      type: String,
    },
    qty: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      require: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to UserSchema
      required: true,
    },
  },
  { timestamps: true }
);

// ~ Export the model
const ProductMedel = mongoose.model("Product", productSchema);

export default ProductMedel;
