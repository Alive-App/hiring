import { LastStockModel } from 'domain/models/last-stock-model'

export interface GetLastStockUseCase {
  getLast(stockName: string): Promise<LastStockModel>
}
