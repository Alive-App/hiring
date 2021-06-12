export interface HistoryStockPricingModel {
  'opening': number,
  'low': number,
  'high': number,
  'closing': number,
  'pricedAt': string // data no formato ISO 8601, UTC
}

export interface HistoryStockModel {
  name: string
  prices: HistoryStockPricingModel[]
}
