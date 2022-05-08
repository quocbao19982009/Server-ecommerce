import Product, { productInput } from '../../src/models/Product'
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} from '../../src/services/productServices'
import connect, { MongodHelper } from '../db-helper'

import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  test,
  expect,
} from '@jest/globals'

const nonExitsProductId = '5e57b77b5744fa0b461c7906'

const createNewProduct = async () => {
  const adminUserId = '5e57b77b5744fa0b461c7904'

  const product: productInput = {
    name: 'Iphone 13',
    price: 132,
    countInStock: 10,
    image: '/images/sample.jpg',
    description: 'Iphone 13 Pro best Iphone',
  }

  const returnedProduct = await createProduct(adminUserId, product)

  return returnedProduct
}

describe('product service', () => {
  let MongodHelper: MongodHelper
  beforeAll(async () => {
    MongodHelper = await connect()
  })

  afterEach(async () => {
    await MongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await MongodHelper.closeDatabase()
  })

  test('Creating Product', async () => {
    const newProduct = await createNewProduct()
    expect(newProduct).toHaveProperty('_id')
    expect(newProduct).toHaveProperty('name', 'Iphone 13')
    expect(newProduct).toHaveProperty('price', 132)
    expect(newProduct).toHaveProperty('countInStock', 10)
    expect(newProduct).toHaveProperty('image', '/images/sample.jpg')
    expect(newProduct).toHaveProperty(
      'description',
      'Iphone 13 Pro best Iphone'
    )
  })

  test('Find all product', async () => {
    await createNewProduct()
    await createNewProduct()
    const allProduct = await getAllProduct()

    expect(allProduct).toHaveLength(2)
  })

  describe('Update a product', () => {
    test('Product exits', async () => {
      const targetProduct = await createNewProduct()
      expect(targetProduct).toHaveProperty('name', 'Iphone 13')

      const updateProperty = {
        name: 'Iphone 10',
        price: 132,
        countInStock: 10,
        image: '/images/sample.jpg',
        description: 'Iphone 13 Pro best Iphone',
      }

      const updatedProduct = await updateProductById(
        targetProduct._id,
        updateProperty
      )
      expect(updatedProduct).toHaveProperty('name', 'Iphone 10')
    })

    test('Product not Exited', async () => {
      expect.assertions(1)
      return await deleteProductById('5e57b77b5744fa0b461c7904').catch((e) => {
        expect(e.message).toMatch('Product not found')
      })
    })
  })
  describe('Delete a product', () => {
    test('Product exits', async () => {
      await createNewProduct()
      await createNewProduct()
      const targetProduct = await createNewProduct()

      expect(targetProduct).toHaveProperty('_id')

      const allProductBefore = await getAllProduct()
      expect(allProductBefore).toHaveLength(3)

      await deleteProductById(targetProduct._id)
      const allProductAfter = await getAllProduct()
      expect(allProductAfter).toHaveLength(2)
    })

    test('Product not Exited', async () => {
      expect.assertions(1)
      return await deleteProductById('5e57b77b5744fa0b461c7904').catch((e) => {
        expect(e.message).toMatch('Product not found')
      })
    })
  })

  describe('Find Product by ID', () => {
    test('Product Exited', async () => {
      const newProduct = await createNewProduct()
      const found = await getProductById(newProduct._id)

      expect(found.name).toEqual(newProduct.name)
      expect(found._id).toEqual(newProduct._id)
    })

    test('Product not Exited', async () => {
      expect.assertions(1)
      return await getProductById('5e57b77b5744fa0b461c7904').catch((e) => {
        expect(e.message).toMatch('Product not found')
      })
    })
  })

  describe('Update Product by ID', () => {
    test('Product Exited', async () => {
      const newProduct = await createNewProduct()
      const found = await getProductById(newProduct._id)

      expect(found.name).toEqual(newProduct.name)
      expect(found._id).toEqual(newProduct._id)
    })

    test('Product not Exited', async () => {
      expect.assertions(1)
      return await getProductById('5e57b77b5744fa0b461c7904').catch((e) => {
        expect(e.message).toMatch('Product not found')
      })
    })
  })
})
