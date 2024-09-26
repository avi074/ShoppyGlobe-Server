import { Router } from "express"
import {
  addProductToCart,
  deleteProductFromCart,
  getCart,
  updateQuantityOfProductInCart,
} from "../controllers/cart.controller.js"
import { checkAutorizationAndRole } from "../middlewares/token.js"
import { Roles } from "../constants.js"

const cartRouter = Router()

/**
 * Authentication Middleware
 */
const handleAuth = checkAutorizationAndRole((d) => Roles.isBuyer(d.user.role))

// fetches cart info according to the user's token
cartRouter.get("/", handleAuth, getCart)

// adds product to the cart
cartRouter.post("/", handleAuth, addProductToCart)

// updates the quantity of a product in the cart by the productId
cartRouter.put("/:productId", handleAuth, updateQuantityOfProductInCart)

/**
 * deletes a product in the cart by productId or
 * if productId not provided then deletes all products
 */
cartRouter.delete("/:productId?", handleAuth, deleteProductFromCart)

export default cartRouter
