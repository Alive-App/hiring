import { StockGainsModel } from 'domain/models/stock-gains-model'

export interface GetStockGainsUsecase {
  getGains(stockName: string, purchasedAmount: number, purchasedAt: Date): Promise<StockGainsModel>
}
