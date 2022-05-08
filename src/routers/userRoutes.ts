import express from 'express'

import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  loginWithGoogle,
} from '../controllers/userController'
import validate from '../middlewares/validationResources'
import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../schema/userSchema'
import { protect, admin } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').post(validate(registerUserSchema), registerUser)
router.post('/login', validate(loginUserSchema), authUser)
router.post('/login-google', loginWithGoogle)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, validate(updateUserSchema), updateUserProfile)
export default router
