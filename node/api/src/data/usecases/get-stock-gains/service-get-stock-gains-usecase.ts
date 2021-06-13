import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { GetStockByDateService } from 'data/protocols/get-stock-by-date-service'
import { StockGainsModel } from 'domain/models/stock-gains-model'
import { GetStockGainsUsecase } from 'domain/usecases/get-stock-gains-usecase'

export class ServiceGetStockGainsUsecase implements GetStockGainsUsecase {
  constructor (
    private readonly getLastStockService: GetLastStockService,
    private readonly getStockByDateService: GetStockByDateService
  ) { }

  async getGains (stockName: string, purchasedAmount: number, purchasedAt: Date): Promise<StockGainsModel> {
    const lastStock = await this.getLastStockService.getLastStock(stockName)
    const stockByDate = await this.getStockByDateService.getStockByDate(stockName, purchasedAt)

    const valueAtDate = purchasedAmount * stockByDate.lastPrice
    const lastValue = purchasedAmount * lastStock.lastPrice

    return {
      name: stockName,
      purchasedAmount: Number(purchasedAmount),
      purchasedAt: stockByDate.pricedAt,
      priceAtDate: stockByDate.lastPrice,
      lastPrice: lastStock.lastPrice,
      capitalGains: lastValue - valueAtDate
    }
  }
}
