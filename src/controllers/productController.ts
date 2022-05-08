import { Request, Response, NextFunction } from 'express'
import Product, { productInput } from '../models/Product'
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} from '../services/productServices'
import { customResquest } from '../middlewares/authMiddleware'
import { InternalServerError, NotFoundError } from '../helpers/apiError'

const createProductHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminId = req.userInfo._id
    const productInput = req.body

    const product = await createProduct(adminId, productInput)

    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

const getAllProductHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProduct()

    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

const getProductByIdHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id
    const product = await getProductById(productId)

    return res.status(200).json(product)
  } catch (error) {
    next(new NotFoundError('Product not found'))
  }
}

const deleteProductHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id
    const deleteSucess = await deleteProductById(productId)

    if (deleteSucess) {
      res.status(200).json({ message: 'Product removed' })
    } else {
      throw new InternalServerError('Server fail to delete product')
    }
  } catch (error) {
    next(error)
  }
}

const updateProductHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id
    const updateProductInput = req.body
    const updatedProduct = await updateProductById(
      productId,
      updateProductInput
    )

    return res.status(200).json(updatedProduct)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export {
  createProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  deleteProductHandler,
  updateProductHandler,
}
