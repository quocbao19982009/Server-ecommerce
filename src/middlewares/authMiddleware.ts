import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { DataStoreInToken } from '../util/generateToken'
import { UnauthorizedError } from '../helpers/apiError'
import { findUserById } from '../services/userService'

export interface customResquest extends Request {
  userInfo?: any
}

const protect = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    const jwtToken = token.split(' ')[1]
    try {
      const decoded = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET!
      ) as DataStoreInToken

      const user = await findUserById(decoded.id)

      req.userInfo = user
      next()
    } catch (error) {
      console.error(error)
      next(new UnauthorizedError('Not authorized, token fail'))
    }
  }
  if (!token) {
    next(new UnauthorizedError('No authorized found'))
  }
}

const admin = async (
  req: customResquest,
  res: Response,
  next: NextFunction
) => {
  const user = req.userInfo!

  if (user && user.isAdmin) {
    next()
  } else {
    next(new UnauthorizedError('Not authorized as admin'))
  }
}

export { protect, admin }
