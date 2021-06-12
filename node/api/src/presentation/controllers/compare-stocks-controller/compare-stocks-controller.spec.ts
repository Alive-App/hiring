import { CompareStockModel } from 'domain/models/compare-stock-model'
import { LastStockModel } from 'domain/models/last-stock-model'
import { CompareStocksUsecase } from 'domain/usecases/compare-stocks-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, ok, serverError } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { CompareStocksController } from './compare-stocks-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
  },
  body: {
    stocks: ['IBM']
  }
})

const makeFakeLastStockData = (): LastStockModel => ({
  name: 'any_name',
  lastPrice: 10,
  pricedAt: 'any_priced_at'
})

const makeCompareStocksUsecaseStub = () => {
  class CompareStocksUsecaseStub implements CompareStocksUsecase {
    async compare (stocks: string[]): Promise<CompareStockModel> {
      return {
        lastPrices: [
          makeFakeLastStockData()
        ]
      }
    }
  }

  return new CompareStocksUsecaseStub()
}

const makeSut = () => {
  const compareStocksUsecaseStub = makeCompareStocksUsecaseStub()
  const sut = new CompareStocksController(compareStocksUsecaseStub)

  return { sut, compareStocksUsecaseStub }
}

describe('CompareStocksController', () => {
  test('should return 400 if stockName not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params.stockName = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stockName')))
  })

  test('should call compareStocksUsecase with correct values', async () => {
    const { sut, compareStocksUsecaseStub } = makeSut()
    const compareSpy = jest.spyOn(compareStocksUsecaseStub, 'compare')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(compareSpy).toHaveBeenLastCalledWith(request.body.stocks)
  })

  test('should return 500 if compareStocksUsecase throws', async () => {
    const { sut, compareStocksUsecaseStub } = makeSut()
    jest.spyOn(compareStocksUsecaseStub, 'compare').mockRejectedValueOnce(new Error())
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError())
  })

  test('should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok({
      lastPrices: [
        makeFakeLastStockData()
      ]
    }))
  })
})
