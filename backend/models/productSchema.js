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
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ], // Array of image URLs
    attributes: [
      {
        key: { type: String }, // e.g., "Size", "Color", "Weight"
        value: { type: String }, // e.g., "L", "Red", "5kg"
      },
    ],
    ratings: {
      average: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
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
