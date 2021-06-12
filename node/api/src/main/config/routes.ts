import { Application } from 'express'
import { expressControllerAdapter } from 'main/adapters/express-controller-adapter'

import { makeGetLastStockController } from 'main/factories/make-get-last-stock-controller'
import { makeGetHistoryStockController } from 'main/factories/make-get-history-stock-controller'
import { makeCompareStocksController } from 'main/factories/make-compare-stocks-controller'

export const setupRoutes = (app: Application) => {
  app.get('/stocks/:stockName/history', expressControllerAdapter(makeGetHistoryStockController()))
  app.get('/stocks/:stockName/quote', expressControllerAdapter(makeGetLastStockController()))
  app.get('/stocks/:stockName/compare', expressControllerAdapter(makeCompareStocksController()))
}
