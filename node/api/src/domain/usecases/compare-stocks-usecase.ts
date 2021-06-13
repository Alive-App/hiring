import { CompareStockModel } from 'domain/models/compare-stock-model'

export interface CompareStocksUsecase {
  compare(stockName: string, stocks: string[]): Promise<CompareStockModel>
}
