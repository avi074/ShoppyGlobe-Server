import { model, Schema } from "mongoose"

const cartSchema = new Schema(
  {
    products: [
      {
        _id:false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
)

const cartModel = model("Cart", cartSchema)

export default cartModel
