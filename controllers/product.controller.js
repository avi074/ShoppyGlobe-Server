import handler from "../handler.js"
import productModel from "../models/product.model.js"

const { handlePromise } = handler("Product")

/**
 * fetches product(s) from db
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const getProducts = async (req, res) => {
  const { id } = req.params
  let result

  if (id) {
    result = await handlePromise(productModel.findById(id), req.method)
  } else {
    result = await handlePromise(productModel.find(), req.method)
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

/**
 * adds a new product in db
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const addProduct = async (req, res) => {
  const newProduct = new productModel(req.body)

  const result = await handlePromise(newProduct.save(), req.method)

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

/**
 * updates an existing product in db by id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const updateProductById = async (req, res) => {
  const { id } = req.params

  const result = await handlePromise(
    productModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    ),
    req.method,
  )

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

/**
 * deletes an existing product in db by id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const deleteProductById = async (req, res) => {
  const { id } = req.params

  const result = await handlePromise(
    productModel.findByIdAndDelete(id),
    req.method,
  )

  return res
    .status(result.statusCode)
    .json({ message: result.message, data: result.data })
}

export { getProducts, addProduct, updateProductById, deleteProductById }
