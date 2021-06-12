import { GetLastStockController } from 'presentation/controllers/get-last-stock/get-last-stock-controller'
import { ServiceGetLastStockUsecase } from 'data/usecases/get-last-stock/service-get-last-stock-usecase'
import { AlphaVantageService } from 'infra/service/alpha-vantage-service'
import { env } from 'main/config/env'

export const makeGetLastStockController = () => {
  const getLastStockService = new AlphaVantageService(env.alphaVantageToken)
  const getLastStockUsecase = new ServiceGetLastStockUsecase(getLastStockService)
  return new GetLastStockController(getLastStockUsecase)
}
