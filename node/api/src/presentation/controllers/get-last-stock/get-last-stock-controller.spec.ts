import { GetLastStockUseCase, LastStockData } from 'domain/usecases/get-last-stock-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetLastStockController } from './get-last-stock-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
  }
})

const makeFakeLastStockData = (): LastStockData => ({
  name: 'any_name',
  lastPrice: 10,
  pricedAt: 'any_priced_at'
})

const makeGetLastStockUsecaseStub = () => {
  class GetLastStockUsecaseStub implements GetLastStockUseCase {
    async getLast (stockName: string): Promise<LastStockData> {
      return makeFakeLastStockData()
    }
  }

  return new GetLastStockUsecaseStub()
}

const makeSut = () => {
  const getLastStockUsecaseStub = makeGetLastStockUsecaseStub()
  const sut = new GetLastStockController(getLastStockUsecaseStub)

  return { sut, getLastStockUsecaseStub }
}

describe('GetLastStockController', () => {
  test('should return 400 if stockName not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params.stockName = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stockName')))
  })

  test('should call GetLastStockUsecase with correct value', async () => {
    const { sut, getLastStockUsecaseStub } = makeSut()
    const getLastSpy = jest.spyOn(getLastStockUsecaseStub, 'getLast')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(getLastSpy).toHaveBeenLastCalledWith(request.params.stockName)
  })
})
