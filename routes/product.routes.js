import { Router } from "express"
import {
  addProduct,
  deleteProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller.js"
import { checkAutorizationAndRole } from "../middlewares/token.js"
import { Roles } from "../constants.js"

const productRouter = Router()

/**
 * Authentication Middleware
 */
const handleAuth = checkAutorizationAndRole((d) =>
  Roles.isAdministrator(d.user.role),
)

// Get either all products or a product by ID
productRouter.get("/:id?", getProducts)

// Add a new product
productRouter.post("/", handleAuth, addProduct)

// Update a product by ID
productRouter.put("/:id", handleAuth, updateProductById)

// Delete a product by ID
productRouter.delete("/:id", handleAuth, deleteProductById)

export default productRouter
