import mongoose, { model, Schema } from "mongoose"
import Email from "mongoose-type-email"
import { Roles } from "../constants.js"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Roles.getAllRoles(),
      default: Roles.BUYER,
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      unique: true,
      sparse:true,
    },
  },
  { timestamps: true },
)

const userModel = model("User", userSchema)

export default userModel
