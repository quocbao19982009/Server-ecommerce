import { Request, Response, NextFunction } from 'express'
import { any } from 'zod'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

// This errror Handler is quite sad, but cause this only handle for APIError, if the error come from mongoose, mongoDB or somthing else it will not handle correctly

export default function (
  error: ApiError | any,
  // QUESTION: I want handle mongoose error here, what type of error mongoose give
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.source) {
    logger.error(error.source)
  }

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Malformatted id',
    })
  }

  if (error.name === 'ValidationError') {
    return res
      .status(400)
      .json({ status: 'error', statusCode: 400, message: error.message })
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode || 500,
      message: error.message,
    })
  }

  return res.status(error.statusCode || 500).json({
    status: 'error',
    statusCode: error.statusCode || 500,
    message: error.message,
  })
}
