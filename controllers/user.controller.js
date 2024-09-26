import { Roles } from "../constants.js"
import handler from "../handler.js"
import tokenModule from "../middlewares/token.js"
import cartModel from "../models/cart.model.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"

const { handlePromise } = handler("User")

/**
 * registers the user in db with respective data &
 * if user is buyer then assign a particular cart to the user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const registerUser = async (req, res) => {
  let result = null

  req.body.password = bcrypt.hashSync(req.body.password, 8)

  const newUser = new userModel(req.body)

  if (Roles.isBuyer(newUser.role)) {
    const newCart = new cartModel({ products: [] })
    newUser.cartId = newCart._id

    result = await handlePromise(newCart.save(), req.method)
  }

  if (!result || result.success)
    result = await handlePromise(newUser.save(), req.method)

  return res.status(result.statusCode).json({
    message: result.message,
    data: result.data,
  })
}

/**
 * checks for user credential for logging in &
 * generates an access token for further use
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const loginUser = async (req, res) => {
  let result,
    accessToken = null
  const { email, password } = req.body

  // checking if the user exists via email in db
  result = await handlePromise(userModel.findOne({ email: email }), "LogIn")
  if (result.success) {
    if (bcrypt.compareSync(password, result.data.password)) {
      const token = tokenModule.create({
        user: {
          id: result.data._id,
          role: result.data.role,
          cartId: result.data.cartId,
        },
      })
      accessToken = token
    } else {
      return res.status(403).json({ message: "Invalid credentials !" })
    }
  }

  return res.status(result.statusCode).json({
    message: result.message,
    accessToken: accessToken,
    data: result.data,
  })
}

export { registerUser, loginUser }
