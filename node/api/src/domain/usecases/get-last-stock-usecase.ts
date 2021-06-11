export interface LastStockData {
  'name': string,
  'lastPrice': number,
  'pricedAt': string // data e hora no formato ISO 8601, UTC
}

export interface GetLastStockUseCase {
  getLast(stockName: string): Promise<LastStockData>
}
