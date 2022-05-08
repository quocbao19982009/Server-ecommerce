import express from 'express'
import validate from '../middlewares/validationResources'

import {
  createProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  deleteProductHandler,
  updateProductHandler,
} from '../controllers/productController'
import { protect, admin } from '../middlewares/authMiddleware'
import {
  createProductSchema,
  updateProductSchema,
} from '../schema/productSchema'

const router = express.Router()

router
  .route('/')
  .post(protect, admin, validate(createProductSchema), createProductHandler)
  .get(getAllProductHandler)
router
  .route('/:id')
  .get(getProductByIdHandler)
  .delete(protect, admin, deleteProductHandler)
  .put(protect, admin, validate(updateProductSchema), updateProductHandler)

export default router
