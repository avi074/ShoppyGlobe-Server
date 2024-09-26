import { Schema, model } from "mongoose"

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: Number,
    rating: Number,
    stock: {
      type: Number,
      min: 0,
      required: true,
    },
    brand: String,
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
  },
  { timestamps: true },
)

const productModel = model("Product", productSchema)

export default productModel
