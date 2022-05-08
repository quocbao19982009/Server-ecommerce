import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import userRouter from './routers/userRoutes'
import productRouter from './routers/productRoutes'
import orderRouter from './routers/orderRoutes'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

// dotenv.config because usually .env is located in the root, now its in /api
dotenv.config({ path: '.env' })

const app = express()

var cors = require('cors')

app.use(cors())

// Express configuration
app.set('port', process.env.PORT || 5000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Passport for google login

// Set up routers
app.use('/health', (req, res, next) => {
  res.status(200).send('Server is running just fine!')
})
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
