import { LastStockModel } from 'domain/models/last-stock-model'

export interface GetLastStockService {
  getLastStock(stockName: string): Promise<LastStockModel>
}
