import { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject, ZodError, any } from 'zod'
import { BadRequestError } from '../helpers/apiError'

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      // Handle error for fail validation
      const errorZod = error as any
      let errorMessage = ''
      for (let i = 0; i < errorZod.errors.length; i++) {
        errorMessage = errorMessage + errorZod.errors[i].message + ', '
      }
      next(new BadRequestError(errorMessage, errorZod))
    }
  }

export default validate
