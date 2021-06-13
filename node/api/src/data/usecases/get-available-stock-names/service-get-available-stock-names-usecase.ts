import { GetAvailableStockNamesService } from 'data/protocols/get-available-stock-names-service'
import { GetAvailableStockNamesUsecase } from 'domain/usecases/get-available-stock-names-usecase'

export class ServiceGetAvailableStockNamesUsecase implements GetAvailableStockNamesUsecase {
  constructor (
    private readonly getAvailableStockNamesService: GetAvailableStockNamesService
  ) {}

  async getStockNames (search: string): Promise<string[]> {
    await this.getAvailableStockNamesService.getAvailableStockNames(search)
    return null as any
  }
}
