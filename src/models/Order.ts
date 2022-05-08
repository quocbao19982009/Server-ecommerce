import mongoose from 'mongoose'

export interface OrderItemsInput {
  name: string
  qty: number
  price: number
  product: mongoose.Types.ObjectId
  image: string
}

export interface OrderInterface extends mongoose.Document {
  user: mongoose.Types.ObjectId
  orderItems: OrderItemsInput[]
  totalPrice: number
}

const orderSchema = new mongoose.Schema<OrderInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model<OrderInterface>('Order', orderSchema)

export default Order
