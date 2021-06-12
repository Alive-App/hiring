import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetHistoryStockController } from './get-history-stock-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
  },
  query: {
    fromDate: 'any_from_date',
    toDate: 'any_to_date'
  }
})

const makeSut = () => {
  const sut = new GetHistoryStockController()

  return { sut }
}

describe('GetHistoryStockController', () => {
  test('should return 400 if stockName not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params.stockName = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stockName')))
  })

  test('should return 400 if fromDate not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.fromDate = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('fromDate')))
  })

  test('should return 400 if toDate not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.toDate = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('toDate')))
  })
})
