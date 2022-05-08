import Product, { productInput } from '../../src/models/Product'
import { createProduct } from '../../src/services/productServices'
import { createUser } from '../../src/services/userService'
import connect, { MongodHelper } from '../db-helper'
import app from '../../src/app'

import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  test,
  expect,
} from '@jest/globals'
import supertest from 'supertest'
import mongoose from 'mongoose'
import generateToken from '../../src/util/generateToken'

const userId = new mongoose.Types.ObjectId().toString()

const productPayload = {
  user: userId,
  name: 'Iphone 13',
  price: 132,
  countInStock: 10,
  image: '/images/sample.jpg',
  description: 'Iphone 13 Pro best Iphone',
}

const userPayload = {
  name: 'Bao',
  email: 'bao@example.com',
  isAdmin: true,
}

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

const createUserAdmin = async () => {
  const email = 'bao@example.com'
  const password = '123456'
  const name = 'Bao'
  const isAdmin = true

  const user = await createUser(email, password, name, isAdmin)

  console.log(user)

  return user
}

describe('product', () => {
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

  describe('Get product route', () => {
    test('get all product', async () => {
      await createNewProduct()
      await createNewProduct()
      await createNewProduct()

      const { body } = await supertest(app).get('/api/v1/products')
      expect(body).toHaveLength(3)
    })

    test('get product by Id', async () => {
      await createNewProduct()
      await createNewProduct()
      const targetProduct = await createNewProduct()

      const { body } = await supertest(app)
        .get(`/api/v1/products/${targetProduct._id}`)
        .expect(200)

      expect(body._id).toBe(targetProduct._id.toString())
    })
  })

  describe('create Product', () => {
    test('admin not login', async () => {
      const { statusCode } = await supertest(app)
        .post('/api/v1/products')
        .send(productPayload)

      expect(statusCode).toBe(401)
    })

    test('admin login', async () => {
      const user = await createUserAdmin()

      const token = generateToken(user._id)

      const { statusCode, body } = await supertest(app)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${token}`)
        .send(productPayload)

      expect(statusCode).toBe(200)
      expect(body).toEqual({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        description: 'Iphone 13 Pro best Iphone',
        countInStock: 10,
        image: '/images/sample.jpg',
        price: 132,
        name: 'Iphone 13',
        user: expect.any(String),
      })
    })
  })
})

test('test', () => {
  expect(true).toBe(true)
})
