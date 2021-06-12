import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { CompareStockModel } from 'domain/models/compare-stock-model'
import { CompareStocksUsecase } from 'domain/usecases/compare-stocks-usecase'

export class ServiceCompareStocksUsecase implements CompareStocksUsecase {
  constructor (
    private readonly getLastStockService: GetLastStockService
  ) {}

  async compare (stocks: string[]): Promise<CompareStockModel> {
    const compareStocksModel:CompareStockModel = {
      lastPrices: []
    }

    for (const stock of stocks) {
      const lastStocks = await this.getLastStockService.getLastStock(stock)
      compareStocksModel.lastPrices.push(lastStocks)
    }

    return compareStocksModel
  }
}
