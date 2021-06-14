export interface GetAvailableStockNamesUsecase {
  getStockNames(search: string): Promise<string[]>
}
