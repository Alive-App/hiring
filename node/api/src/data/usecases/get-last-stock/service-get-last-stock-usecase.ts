import { GetLastStockService } from 'data/protocols/services/get-last-stock-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { GetLastStockUsecase } from 'domain/usecases/get-last-stock-usecase'

export class ServiceGetLastStockUsecase implements GetLastStockUsecase {
  constructor (
    private readonly getLastStockService: GetLastStockService
  ) {}

  async getLast (stockName: string): Promise<LastStockModel> {
    const lastStockModel = await this.getLastStockService.getLastStock(stockName)

    return lastStockModel
  }
}
