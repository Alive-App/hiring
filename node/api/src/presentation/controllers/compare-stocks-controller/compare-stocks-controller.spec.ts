import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
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
const makeSut = () => {
  const sut = new CompareStocksController()

  return { sut }
}

describe('CompareStocksController', () => {
  test('should return 400 if stockName not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.params.stockName = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stockName')))
  })

  test('should return 400 if stocks not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.body.stocks = []
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('stocks')))
  })
})
