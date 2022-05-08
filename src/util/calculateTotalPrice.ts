import { OrderItemsInput } from '../models/Order'

const calculateTotalPrice = (items: OrderItemsInput[]) => {
  const totalPrice = items
    .reduce((prev, cur) => prev + cur.price * cur.qty, 0)
    .toFixed(2)
  return totalPrice
}

export default calculateTotalPrice
