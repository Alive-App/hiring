import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { CompareStockModel } from 'domain/models/compare-stock-model'
import { CompareStocksUsecase } from 'domain/usecases/compare-stocks-usecase'

export class ServiceCompareStocksUsecase implements CompareStocksUsecase {
  constructor (
    private readonly getLastStockService: GetLastStockService
  ) {}

  async compare (stocks: string[]): Promise<CompareStockModel> {
    for (const stock of stocks) {
      await this.getLastStockService.getLastStock(stock)
    }

    return null as any
  }
}
