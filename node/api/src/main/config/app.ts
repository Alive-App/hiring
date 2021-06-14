import express from 'express'
import cors from 'cors'

import { setupRoutes } from './routes'

const app = express()
app.use(express.json())
app.use(cors())
setupRoutes(app)

export { app }
