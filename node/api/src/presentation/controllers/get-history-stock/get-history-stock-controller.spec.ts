import { IsoDateValidation } from 'data/protocols/iso-date-validation'
import { ParamInvalidError } from 'presentation/errors/param-invalid-error'
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

const makeIsoDateValidationStub = () => {
  class IsoDateValidationStub implements IsoDateValidation {
    isIsoDateValid (isoDate: string): boolean {
      return true
    }
  }

  return new IsoDateValidationStub()
}

const makeSut = () => {
  const isoDateValidationStub = makeIsoDateValidationStub()
  const sut = new GetHistoryStockController(isoDateValidationStub)

  return { sut, isoDateValidationStub }
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

  test('should return 400 if fromDate invalid', async () => {
    const { sut, isoDateValidationStub } = makeSut()
    jest.spyOn(isoDateValidationStub, 'isIsoDateValid').mockReturnValueOnce(false)
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new ParamInvalidError('fromDate')))
  })

  test('should return 400 if toDate invalid', async () => {
    const { sut, isoDateValidationStub } = makeSut()
    jest.spyOn(isoDateValidationStub, 'isIsoDateValid')
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new ParamInvalidError('toDate')))
  })

  test('should call isoDateValidation with correct values', async () => {
    const { sut, isoDateValidationStub } = makeSut()
    const isIsoDateValidSpy = jest.spyOn(isoDateValidationStub, 'isIsoDateValid')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(isIsoDateValidSpy).toHaveBeenCalledTimes(2)
    expect(isIsoDateValidSpy).toHaveBeenLastCalledWith(request.query.toDate)
  })
})
