import { CompareStocksController } from 'presentation/controllers/compare-stocks-controller/compare-stocks-controller'
import { ServiceCompareStocksUsecase } from 'data/usecases/compare-stocks/service-compare-stocks-usecase'
import { AlphaVantageService } from 'infra/service/alpha-vantage-service'
import { env } from 'main/config/env'

export const makeCompareStocksController = () => {
  const getLastStockService = new AlphaVantageService(env.alphaVantageToken)
  const getLastStockUsecase = new ServiceCompareStocksUsecase(getLastStockService)
  return new CompareStocksController(getLastStockUsecase)
}
