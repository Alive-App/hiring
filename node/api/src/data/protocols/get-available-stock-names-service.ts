export interface GetAvailableStockNamesService {
  getAvailableStockNames(search: string): Promise<string[]>
}
