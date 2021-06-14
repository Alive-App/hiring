import { HistoryStockModel } from 'domain/models/history-stock-model'

export interface GetHistoryStockUsecase {
  getHistory(stockName: string, fromDate: Date, toDate: Date): Promise<HistoryStockModel>
}
