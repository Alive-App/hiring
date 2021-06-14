import { ServiceGetHistoryStockUsecase } from 'data/usecases/get-history-stock/service-get-history-stock'
import { IsoDateValidationImpl } from 'data/validation/iso-date/iso-date-validation'
import { AlphaVantageService } from 'infra/service/alpha-vantage-service'
import { env } from 'main/config/env'
import { GetHistoryStockController } from 'presentation/controllers/get-history-stock/get-history-stock-controller'

export const makeGetHistoryStockController = () => {
  const alphaVantageService = new AlphaVantageService(env.alphaVantageToken)
  const getHistoryStockUsecase = new ServiceGetHistoryStockUsecase(alphaVantageService)
  const isoDateValidation = new IsoDateValidationImpl()
  return new GetHistoryStockController(isoDateValidation, getHistoryStockUsecase)
}
