import { LastStockModel } from 'domain/models/last-stock-model'

export interface GetLastStockUsecase {
  getLast(stockName: string): Promise<LastStockModel>
}
