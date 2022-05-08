import mongoose from 'mongoose'
import { string } from 'zod'

export interface productInput {
  name: string
  description: string
  price: number
  countInStock: number
  image: string
}

export interface ProductInterace extends productInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema<ProductInterace>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    countInStock: { type: Number, required: true, min: 0 },
    image: {
      type: String,
      required: false,
      default: () => '/images/sample.jpg',
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model<ProductInterace>('Product', productSchema)

export default Product
