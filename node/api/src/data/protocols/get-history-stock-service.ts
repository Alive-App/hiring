import { HistoryStockModel } from 'domain/models/history-stock-model'

export interface GetHistoryStockService {
  getHistoryStock(stockName: string, fromDate:Date, toDate:Date): Promise<HistoryStockModel>
}
