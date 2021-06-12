import { GetHistoryStockService } from 'data/protocols/get-history-stock-service'
import { HistoryStockModel, HistoryStockPricingModel } from 'domain/models/history-stock-model'
import { ServiceGetHistoryStockUsecase } from './service-get-history-stock'

const stockName = 'IBM'

const fromDate = new Date(2020, 1, 1)

const toDate = new Date(2020, 2, 1)

const makeFakeHistoryStockPricingModel = (): HistoryStockPricingModel => ({
  closing: 10,
  high: 10,
  low: 10,
  opening: 10,
  pricedAt: 'any_priced_at'
})

const makeFakeHistoryStockModel = (): HistoryStockModel => ({
  name: 'any_name',
  prices: [makeFakeHistoryStockPricingModel()]
})

const makeGetHistoryStockServiceStub = () => {
  class GetHistoryStockServiceStub implements GetHistoryStockService {
    async getHistoryStock (stockName: string, fromDate: Date, toDate: Date): Promise<HistoryStockModel> {
      return makeFakeHistoryStockModel()
    }
  }

  return new GetHistoryStockServiceStub()
}

const makeSut = () => {
  const getHistoryStockServiceStub = makeGetHistoryStockServiceStub()
  const sut = new ServiceGetHistoryStockUsecase(getHistoryStockServiceStub)

  return { sut, getHistoryStockServiceStub }
}

describe('ServiceGetHistoryStockUsecase', () => {
  test('should call getHistoryStockService with correct values', async () => {
    const { sut, getHistoryStockServiceStub } = makeSut()
    const getHistoryStockSpy = jest.spyOn(getHistoryStockServiceStub, 'getHistoryStock')
    await sut.getHistory(stockName, fromDate, toDate)
    expect(getHistoryStockSpy).toHaveBeenLastCalledWith(stockName, fromDate, toDate)
  })

  test('should throw if getHistoryStockService throws', async () => {
    const { sut, getHistoryStockServiceStub } = makeSut()
    jest.spyOn(getHistoryStockServiceStub, 'getHistoryStock').mockRejectedValueOnce(new Error())
    const promise = sut.getHistory(stockName, fromDate, toDate)
    await expect(promise).rejects.toThrow()
  })
})
