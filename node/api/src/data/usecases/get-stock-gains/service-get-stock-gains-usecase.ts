import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { StockGainsModel } from 'domain/models/stock-gains-model'
import { GetStockGainsUsecase } from 'domain/usecases/get-stock-gains-usecase'

export class ServiceGetStockGainsUsecase implements GetStockGainsUsecase {
  constructor (
    private readonly getLastStockService: GetLastStockService
  ) {}

  async getGains (stockName: string, purchasedAmount: number, purchasedAt: Date): Promise<StockGainsModel> {
    await this.getLastStockService.getLastStock(stockName)
    return null as any
  }
}
