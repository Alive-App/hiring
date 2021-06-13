import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetAvailableStockNamesController } from './get-available-stock-names-controller'

const makeFakeRequest = (): HttpRequest => ({
  query: {
    search: 'any_search'
  }
})

const makeSut = () => {
  const sut = new GetAvailableStockNamesController()

  return { sut }
}

describe('GetAvailableStockNamesController', () => {
  test('should return 400 if search is not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.search = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('search')))
  })
})
