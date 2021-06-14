import { ServiceGetStockGainsUsecase } from 'data/usecases/get-stock-gains/service-get-stock-gains-usecase'
import { AlphaVantageService } from 'infra/service/alpha-vantage-service'
import { env } from 'main/config/env'
import { GetStockGainsController } from 'presentation/controllers/get-stock-gains/get-stock-gains-controller'

export const makeGetStockGainsController = () => {
  const alphaService = new AlphaVantageService(env.alphaVantageToken)
  const getStockGainsUsecase = new ServiceGetStockGainsUsecase(alphaService, alphaService)
  return new GetStockGainsController(getStockGainsUsecase)
}
