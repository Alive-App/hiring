import { Router } from 'express'
import StockController from '../controllers/StockController'

const routes = Router()

routes.get('/', (request, response) => response.json('Welcome to STOCK Api 📊'))
routes.get('/stocks/:stock_name/quote', StockController.quote)
routes.get('/stocks/:stock_name/history', StockController.history)

export default routes
