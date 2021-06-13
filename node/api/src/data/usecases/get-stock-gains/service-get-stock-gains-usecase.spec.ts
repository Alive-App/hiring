import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { GetStockByDateService } from 'data/protocols/get-stock-by-date-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { StockByDateModel } from 'domain/models/stock-by-date-model'
import { ServiceGetStockGainsUsecase } from './service-get-stock-gains-usecase'

const makeFakeLastStockModel = (): LastStockModel => ({
  lastPrice: 10,
  name: 'any_name',
  pricedAt: 'any_priced_at'
})

const makeFakeStockByDateModel = (): StockByDateModel => ({
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

const makeGetStockByDateServiceStub = () => {
  class GetStockByDateServiceStub implements GetStockByDateService {
    async getStockByDate (stockName: string, date: Date): Promise<StockByDateModel> {
      return makeFakeStockByDateModel()
    }
  }

  return new GetStockByDateServiceStub()
}

const makeSut = () => {
  const getLastStockServiceStub = makeGetLastStockServiceStub()
  const getStockByDateServiceStub = makeGetStockByDateServiceStub()
  const sut = new ServiceGetStockGainsUsecase(getLastStockServiceStub, getStockByDateServiceStub)

  return { sut, getLastStockServiceStub, getStockByDateServiceStub }
}

describe('ServiceGetStockGainsUsecase', () => {
  test('should call getLastStockService with correct value', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    const date = new Date()
    const getLastStockSpy = jest.spyOn(getLastStockServiceStub, 'getLastStock')
    await sut.getGains('any_name', 100, date)
    expect(getLastStockSpy).toHaveBeenLastCalledWith('any_name')
  })

  test('should throw if getLastStockService throws', async () => {
    const { sut, getLastStockServiceStub } = makeSut()
    const date = new Date()
    jest.spyOn(getLastStockServiceStub, 'getLastStock').mockRejectedValueOnce(new Error())
    const promise = sut.getGains('any_name', 100, date)
    await expect(promise).rejects.toThrow()
  })

  test('should call getStockByDateService with correct value', async () => {
    const { sut, getStockByDateServiceStub } = makeSut()
    const date = new Date()
    const getStockByDatekSpy = jest.spyOn(getStockByDateServiceStub, 'getStockByDate')
    await sut.getGains('any_name', 100, date)
    expect(getStockByDatekSpy).toHaveBeenLastCalledWith('any_name', date)
  })

  test('should return a StockGainsModel on success', async () => {
    const { sut } = makeSut()
    const date = new Date()
    const stockGainsModel = await sut.getGains('any_name', 100, date)
    expect(stockGainsModel).toBeTruthy()
    expect(stockGainsModel.name).toBeTruthy()
    expect(stockGainsModel.priceAtDate).toBeTruthy()
    expect(stockGainsModel.purchasedAmount).toBeTruthy()
  })
})
