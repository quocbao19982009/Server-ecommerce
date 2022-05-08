import { Request, Response, NextFunction } from 'express'
import generateToken from '../util/generateToken'
import User from '../models/User'
import {
  createOrFindUser,
  createUser,
  findUser,
  findUserById,
  updateUser,
} from '../services/userService'
import { customResquest } from '../middlewares/authMiddleware'

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, isAdmin } = req.body

    const user = await createUser(email, password, name, isAdmin)

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }

    return res.status(200).json(responseUser)
  } catch (error) {
    next(error)
  }
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await findUser(email, password)

    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }

    return res.status(200).json(responseUser)
  } catch (error) {
    next(error)
  }
}

const loginWithGoogle = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, googleId } = req.body

    const user = await createOrFindUser(email, name, googleId)

    if (user) {
      const responseUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      }

      return res.status(200).json(responseUser)
    }
  } catch (error) {
    next(error)
  }
}

const getUserProfile = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.userInfo!._id)

    if (user) {
      const responseUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      }
      return res.status(200).json(responseUser)
    }
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body

  const id = req.userInfo!._id

  const updatedUser = await updateUser(id, { name, email, password })

  const responseUser = {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  }

  return res.status(200).json(responseUser)
}
export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  loginWithGoogle,
}
