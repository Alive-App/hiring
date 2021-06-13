import { GetAvailableStockNamesService } from 'data/protocols/get-available-stock-names-service'
import { ServiceGetAvailableStockNamesUsecase } from './service-get-available-stock-names-usecase'

const makeGetAvailableStockNamesServiceStub = () => {
  class GetAvailableStockNamesServiceStub implements GetAvailableStockNamesService {
    async getAvailableStockNames (search: string): Promise<string[]> {
      return ['stock_name_1', 'stock_name_2']
    }
  }

  return new GetAvailableStockNamesServiceStub()
}

const makeSut = () => {
  const getAvailableStockNamesServiceStub = makeGetAvailableStockNamesServiceStub()
  const sut = new ServiceGetAvailableStockNamesUsecase(getAvailableStockNamesServiceStub)
  return { sut, getAvailableStockNamesServiceStub }
}

describe('ServiceGetAvailableStockNamesUsecase', () => {
  test('should call getAvailableStockNamesService with correct value', async () => {
    const { sut, getAvailableStockNamesServiceStub } = makeSut()
    const getAvailableStockNamesSpy = jest.spyOn(getAvailableStockNamesServiceStub, 'getAvailableStockNames')
    await sut.getStockNames('any_stock_name')
    expect(getAvailableStockNamesSpy).toHaveBeenLastCalledWith('any_stock_name')
  })

  test('should throw if getAvailableStockNamesService throws', async () => {
    const { sut, getAvailableStockNamesServiceStub } = makeSut()
    jest.spyOn(getAvailableStockNamesServiceStub, 'getAvailableStockNames').mockRejectedValueOnce(new Error())
    const promise = sut.getStockNames('any_stock_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return a string list on success', async () => {
    const { sut } = makeSut()
    const stockNamesAvailables = await sut.getStockNames('any_stock_name')
    expect(stockNamesAvailables).toEqual(['stock_name_1', 'stock_name_2'])
  })
})
