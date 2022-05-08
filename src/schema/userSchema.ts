const { object, string } = require('zod')
// This has to be required, cannot import, why?

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Invalid name type',
    }),
    password: string({
      required_error: 'Password is required',
      invalid_type_error: 'Invalid password type',
    }).min(6, 'Password too short - should be 6 characters min'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
})

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
      invalid_type_error: 'Invalid password type',
    }).min(6, 'Password too short - should be 6 characters min'),
  }),
})
export const updateUserSchema = object({
  body: object({
    email: string().email('Not a valid email').optional(),
    name: string({ invalid_type_error: 'Invalid name type' }).optional(),
    password: string({
      invalid_type_error: 'Invalid password type',
    })
      .min(6, 'Password too short - should be 6 characters min')
      .optional(),
  }),
})
