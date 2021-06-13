import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetStockGainsController } from './get-stock-gains-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
  },
  query: {
    purchasedAmount: 100,
    purchasedAt: '2021-06-12T20:00:00.000Z'
  }
})

const makeSut = () => {
  const sut = new GetStockGainsController()

  return { sut }
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
})
