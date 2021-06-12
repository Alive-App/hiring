import { CompareStockModel } from 'domain/models/compare-stock-model'

export interface CompareStocksUsecase {
  compare(stocks: string[]): Promise<CompareStockModel>
}
