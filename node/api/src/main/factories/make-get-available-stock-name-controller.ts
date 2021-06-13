import { ServiceGetAvailableStockNamesUsecase } from 'data/usecases/get-available-stock-names/service-get-available-stock-names-usecase'
import { AlphaVantageService } from 'infra/service/alpha-vantage-service'
import { env } from 'main/config/env'
import { GetAvailableStockNamesController } from 'presentation/controllers/get-available-stock-names/get-available-stock-names-controller'

export const makeGetAvailableStockNamesController = () => {
  const alphaVantageService = new AlphaVantageService(env.alphaVantageToken)
  const getAvailableStockNamesUsecase = new ServiceGetAvailableStockNamesUsecase(alphaVantageService)
  return new GetAvailableStockNamesController(getAvailableStockNamesUsecase)
}
