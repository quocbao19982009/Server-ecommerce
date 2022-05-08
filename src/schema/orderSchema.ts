const { object, string, number, array } = require('zod')

export const createOrderSchema = object({
  body: array(
    object({
      name: string({
        required_error: 'Name for the product is required',
      }),
      qty: number({
        required_error: 'Quality for the product is required',
      }).positive({ message: 'Quality must be bigger than 0' }),
      image: string({
        required_error: 'Image for the product is required',
      }),
      price: number({
        required_error: 'Price for the product is required',
      }).positive({ message: 'Price must be bigger than 0' }),
      product: string({
        required_error: "Product's Id is required",
      }),
    })
  ),
})
