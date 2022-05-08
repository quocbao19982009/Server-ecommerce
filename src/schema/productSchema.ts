const { object, string, number } = require('zod')
// This has to be required, cannot import, why?

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name for the product is required',
    }),
    description: string({
      required_error: 'Description for the product is required',
    }),
    image: string().optional(),
    price: number({
      required_error: 'Price for the product is required',
    }).positive({ message: 'Price must be bigger than 0' }),
    countInStock: number({
      required_error: 'Count in stock for the product is required',
    }).nonnegative({ message: 'Count in stock cannot be negative number' }),
  }),
})

export const updateProductSchema = object({
  body: object({
    name: string({
      required_error: 'Name for the product is required',
    }).optional(),
    description: string({
      required_error: 'Description for the product is required',
    }).optional(),
    image: string().optional(),
    price: number({
      required_error: 'Price for the product is required',
    })
      .positive({ message: 'Price must be bigger than 0' })
      .optional(),
    countInStock: number({
      required_error: 'Count in stock for the product is required',
    }).nonnegative({ message: 'Count in stock cannot be negative number' }),
  }),
})
