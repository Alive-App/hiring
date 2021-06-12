import { GetHistoryStockService } from 'data/protocols/get-history-stock-service'
import { HistoryStockModel } from 'domain/models/history-stock-model'
import { GetHistoryStockUsecase } from 'domain/usecases/get-history-stock-usecase'

export class ServiceGetHistoryStockUsecase implements GetHistoryStockUsecase {
  constructor (
    private readonly getHistoryStockService: GetHistoryStockService
  ) {}

  async getHistory (stockName: string, fromDate: Date, toDate: Date): Promise<HistoryStockModel> {
    await this.getHistoryStockService.getHistoryStock(stockName, fromDate, toDate)
    return {
      name: stockName,
      prices: []
    }
  }
}
