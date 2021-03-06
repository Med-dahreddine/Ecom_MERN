const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 150,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      maxLength: 2000,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    shipping: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
