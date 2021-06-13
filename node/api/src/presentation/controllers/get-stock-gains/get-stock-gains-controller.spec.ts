import { StockGainsModel } from 'domain/models/stock-gains-model'
import { GetStockGainsUsecase } from 'domain/usecases/get-stock-gains-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetStockGainsController } from './get-stock-gains-controller'

const makeFakeStockGainsModel = (): StockGainsModel => ({
  name: 'any_stock_name',
  purchasedAmount: 100,
  purchasedAt: '2021-06-12T20:00:00.000Z',
  priceAtDate: 10,
  lastPrice: 11,
  capitalGains: 100
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
  },
  query: {
    purchasedAmount: 100,
    purchasedAt: '2021-06-12T20:00:00.000Z'
  }
})

const makeGetStockGainsUsecaseStub = () => {
  class GetStockGainsUsecaseStub implements GetStockGainsUsecase {
    async getGains (stockName: string, purchasedAmount: number, purchasedAt: Date): Promise<StockGainsModel> {
      return makeFakeStockGainsModel()
    }
  }

  return new GetStockGainsUsecaseStub()
}

const makeSut = () => {
  const getStockGainsUsecaseStub = makeGetStockGainsUsecaseStub()
  const sut = new GetStockGainsController(getStockGainsUsecaseStub)

  return { sut, getStockGainsUsecaseStub }
}

describe('GetStockGainsController', () => {
  test('should return 400 if stockName not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params.stockName = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stockName')))
  })

  test('should return 400 if purchasedAmount not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.purchasedAmount = null
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('purchasedAmount')))
  })

  test('should return 400 if purchasedAt not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.purchasedAt = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('purchasedAt')))
  })

  // test('should call getStockGainsUsecase', async () => {
  //   const { sut, getStockGainsUsecaseStub } = makeSut()
  //   const getGainsSpy = jest.spyOn(getStockGainsUsecaseStub, 'getGains')
  //   const request = makeFakeRequest()
  //   await sut.handle(request)
  //   expect(getGainsSpy).toHaveBeenLastCalledWith(request.params.stockName, request.query.purchasedAmount, request.query.purchasedAt)
  // })
})
