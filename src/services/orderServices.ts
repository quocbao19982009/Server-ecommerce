import { NotFoundError } from '../helpers/apiError'
import Order, { OrderItemsInput } from '../models/Order'
import calculateTotalPrice from '../util/calculateTotalPrice'

const createOrder = async (userId: string, orderItems: OrderItemsInput[]) => {
  const totalPrice = calculateTotalPrice(orderItems)

  const order = new Order({
    user: userId,
    orderItems,
    totalPrice,
  })

  const createdOrder = await order.save()

  return createdOrder
}

const getAllOrder = async () => {
  const orders = await Order.find({}).populate('user', 'id name')
  return orders
}

const getUserOrder = async (userId: string) => {
  const orders = await Order.find({ user: userId })

  return orders
}

const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user', 'name email')

  if (!order) {
    throw new NotFoundError('No order found')
  }

  return order
}

export { createOrder, getAllOrder, getUserOrder, getOrderById }
