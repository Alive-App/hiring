import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { ServiceCompareStocksUsecase } from './service-compare-stocks-usecase'

const makeFakeLastStockModel = (): LastStockModel => ({
  lastPrice: 10,
  name: 'any_name',
  pricedAt: 'any_priced_at'
})

const makeGetLastStockServiceStub = () => {
  class GetLastStockServiceStub implements GetLastStockService {
    async getLastStock (stockName: string): Promise<LastStockModel> {
      return makeFakeLastStockModel()
    }
  }

  return new GetLastStockServiceStub()
}

const makeSut = () => {
  const getLastStockServiceStub = makeGetLastStockServiceStub()
  const sut = new ServiceCompareStocksUsecase(getLastStockServiceStub)

  return { sut, getLastStockServiceStub }
}

describe('ServiceCompareStocksUsecase', () => {
  test('should call getLastStockService with correct value', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    const getLastStockSpy = jest.spyOn(getLastStockServiceStub, 'getLastStock')
    await sut.compare(['IBM'])
    expect(getLastStockSpy).toHaveBeenLastCalledWith('IBM')
  })
})
