import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { ServiceGetLastStockUsecase } from './service-get-last-stock-usecase'

const fakeStockName = 'any_stock_name'

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
  const sut = new ServiceGetLastStockUsecase(getLastStockServiceStub)

  return { sut, getLastStockServiceStub }
}

describe('ServiceGetLastStockUsecase', () => {
  test('should call GetLastStockService with correct value', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    const getLastStockSpy = jest.spyOn(getLastStockServiceStub, 'getLastStock')
    await sut.getLast(fakeStockName)
    expect(getLastStockSpy).toHaveBeenLastCalledWith(fakeStockName)
  })

  test('should throws if GetLastStockService throw', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    jest.spyOn(getLastStockServiceStub, 'getLastStock').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.getLast(fakeStockName)
    await expect(promise).rejects.toThrow()
  })

  test('should return LastStockModel on success', async () => {
    const { sut } = makeSut()
    const lastStockModel = await sut.getLast(fakeStockName)
    expect(lastStockModel).toEqual(makeFakeLastStockModel())
  })
})
