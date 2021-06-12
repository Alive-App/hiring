import { Application } from 'express'
import { expressControllerAdapter } from 'main/adapters/express-controller-adapter'
import { makeGetLastStockController } from 'main/factory/make-get-last-stock-controller'

export const setupRoutes = (app: Application) => {
  app.get('/stocks/:stockName/quote', expressControllerAdapter(makeGetLastStockController()))
}
