import { Request, Response, NextFunction } from 'express'
import {
  createOrder,
  getAllOrder,
  getOrderById,
  getUserOrder,
} from '../services/orderServices'
import { BadRequestError } from '../helpers/apiError'

import { customResquest } from '../middlewares/authMiddleware'

const addOrderItemHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userInfo!._id

    const orderItems = req.body

    if (orderItems && orderItems.length === 0) {
      throw new BadRequestError('No order items')
    }

    const order = await createOrder(userId, orderItems)

    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

const getAllOrderHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await getAllOrder()
    return res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

const getMyOrderHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userInfo._id

    const orders = await getUserOrder(userId)

    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

const getOrderByIdHandler = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id

    const order = await getOrderById(orderId)

    return res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

export {
  addOrderItemHandler,
  getAllOrderHandler,
  getMyOrderHandler,
  getOrderByIdHandler,
}
