import handler from "../handler.js"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

const { handlePromise } = handler("Cart")

/**
 * Fetches Cart information according to the user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const getCart = async (req, res) => {
  const result = await handlePromise(
    cartModel.findById(req.tokenPayload.user.cartId),
    req.method,
  )

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
  }

/**
 * Add product with quantity to the user's cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const addProductToCart = async (req, res) => {
  const {
    tokenPayload: {
      user: { cartId },
    },
    body: { productId, quantity },
  } = req

  // checking cart
  let result = await handlePromise(cartModel.findById(cartId), req.method)

  if (result.success) {
    const cart = result.data

    const checkProduct = await handlePromise(
      productModel.findById(productId),
      req.method,
    )

    if (checkProduct.success) {
      cart.products.push({ productId, quantity })
      result = await handlePromise(cart.save(), "addProduct")
    } else {
      result = checkProduct
    }
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

/**
 * Updates quantity of the product in the user's cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const updateQuantityOfProductInCart = async (req, res) => {
  const {
    tokenPayload: {
      user: { cartId },
    },
    params: { productId },
    body: { quantity },
  } = req

  // fetching the cart
  let result = await handlePromise(cartModel.findById(cartId), req.method)

  if (result.success) {
    const cart = result.data

    const index = cart.products.findIndex(
      (p) => p.productId.toString() == productId,
    )

    if (index == -1) {
      return res.status(404).json({ message: "Product Not Found in Cart!" })
    }
    cart.products[index].quantity = quantity
    result = await handlePromise(cart.save(), req.method)
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

/**
 * Delete product(s) from the user's cart
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const deleteProductFromCart = async (req, res) => {
  const {
    params: { productId },
    tokenPayload: {
      user: { cartId },
    },
  } = req

  // fetching the cart
  let result = await handlePromise(cartModel.findById(cartId), req.method)

  if (result.success) {
    const cart = result.data

    if (productId) {
      // deletes a product by id
      const index = cart.products.findIndex(
        (p) => p.productId.toString() == productId,
      )
      if (index == -1) {
        return res.status(404).json({ message: "Product Not Found in Cart!" })
      }
      cart.products.splice(index, 1)
    } else {
      // clear the cart
      cart.products = []
    }
    result = await handlePromise(cart.save(), req.method)
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

export {
  getCart,
  addProductToCart,
  updateQuantityOfProductInCart,
  deleteProductFromCart,
}
