import 'dotenv/config'
import express, { Request, NextFunction, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { AppError } from './errors/AppError'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    console.log('Internal Error', error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

export default app
