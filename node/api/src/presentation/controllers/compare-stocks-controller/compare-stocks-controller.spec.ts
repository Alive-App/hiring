import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { CompareStocksController } from './compare-stocks-controller'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    stockName: 'any_stock_name'
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
})
