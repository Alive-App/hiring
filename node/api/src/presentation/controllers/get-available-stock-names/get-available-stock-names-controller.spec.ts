import { GetAvailableStockNamesUsecase } from 'domain/usecases/get-available-stock-names-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetAvailableStockNamesController } from './get-available-stock-names-controller'

const makeFakeRequest = (): HttpRequest => ({
  query: {
    search: 'any_search'
  }
})

const makeGetAvailableStockNamesUsecaseStub = () => {
  class GetAvailableStockNamesUsecaseStub implements GetAvailableStockNamesUsecase {
    async getStockNames (search: string): Promise<string[]> {
      return ['stock_name_1', 'stock_name_2']
    }
  }

  return new GetAvailableStockNamesUsecaseStub()
}

const makeSut = () => {
  const getAvailableStockNamesUsecaseStub = makeGetAvailableStockNamesUsecaseStub()
  const sut = new GetAvailableStockNamesController(getAvailableStockNamesUsecaseStub)

  return { sut, getAvailableStockNamesUsecaseStub }
}

describe('GetAvailableStockNamesController', () => {
  test('should return 400 if search is not provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.query.search = ''
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new ParamNotProvidedError('search')))
  })

  test('should call getAvailableStockNamesUsecase with correct values', async () => {
    const { sut, getAvailableStockNamesUsecaseStub } = makeSut()
    const getStockNamesSpy = jest.spyOn(getAvailableStockNamesUsecaseStub, 'getStockNames')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(getStockNamesSpy).toHaveBeenLastCalledWith(request.query.search)
  })
})
