import { StockByDateModel } from 'domain/models/stock-by-date-model'

export interface GetStockByDateService {
  getStockByDate(stockName:string, date: Date): Promise<StockByDateModel>
}
