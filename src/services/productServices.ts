import Product, { productInput } from '../models/Product'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const createProduct = async (
  adminId: string,
  update: Partial<productInput>
) => {
  const { name, price, image, countInStock, description } = update

  const product = new Product({
    name,
    price,
    image,
    countInStock,
    description,
    user: adminId,
  })

  const createdProduct = await product.save()

  if (!createdProduct) {
    throw new BadRequestError('Invalid product input')
  }

  return createdProduct
}

const getAllProduct = async () => {
  const products = await Product.find({})

  return products
}

const getProductById = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new NotFoundError('Product not found')
  }
  return product
}

const deleteProductById = async (id: string) => {
  const product = await Product.findById(id)

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  await Product.findByIdAndDelete(id)
  return true
}

const updateProductById = async (id: string, update: Partial<productInput>) => {
  console.log('id', id)

  const productFind = await Product.findById(id)

  if (!productFind) {
    throw new NotFoundError('Product not found')
  }

  const { name, price, description, countInStock, image } = update

  const updatedProduct = await Product.findByIdAndUpdate(id, update, {
    new: true,
  })

  return updatedProduct
}

export {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
}
