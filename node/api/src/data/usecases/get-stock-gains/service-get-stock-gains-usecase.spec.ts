import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { ServiceGetStockGainsUsecase } from './service-get-stock-gains-usecase'

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
  const sut = new ServiceGetStockGainsUsecase(getLastStockServiceStub)

  return { sut, getLastStockServiceStub }
}

describe('ServiceGetStockGainsUsecase', () => {
  test('should call getLastStockService with correct value', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    const date = new Date()
    const getLastStockSpy = jest.spyOn(getLastStockServiceStub, 'getLastStock')
    await sut.getGains('any_name', 100, date)
    expect(getLastStockSpy).toHaveBeenLastCalledWith('any_name')
  })
})
