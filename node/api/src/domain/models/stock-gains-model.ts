export interface StockGainsModel {
  'name': string,
  'purchasedAmount': number,
  'purchasedAt': string, // data em formato ISO 8601,
  'priceAtDate': number, // preço na data de compra
  'lastPrice': number, // preço mais recente
  'capitalGains': number // ganhos ou perdas com a ação, em reais
}
