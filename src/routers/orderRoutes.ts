import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware'

import {
  addOrderItemHandler,
  getAllOrderHandler,
  getMyOrderHandler,
  getOrderByIdHandler,
} from '../controllers/orderController'
import validate from '../middlewares/validationResources'
import { createOrderSchema } from '../schema/orderSchema'

const router = express.Router()

router
  .route('/')
  .post(protect, validate(createOrderSchema), addOrderItemHandler)
  .get(protect, admin, getAllOrderHandler)

router.route('/myorder').get(protect, getMyOrderHandler)
router.route('/:id').get(protect, getOrderByIdHandler)

export default router
