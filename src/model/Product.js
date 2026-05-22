const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
      default: "unisex",
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    size: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
