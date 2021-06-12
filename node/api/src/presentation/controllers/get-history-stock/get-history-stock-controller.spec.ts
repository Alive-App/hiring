import { IsoDateValidation } from 'domain/validations/iso-date-validation'
import { HistoryStockModel, HistoryStockPricingModel } from 'domain/models/history-stock-model'
import { GetHistoryStockUsecase } from 'domain/usecases/get-history-stock-usecase'
import { ParamInvalidError } from 'presentation/errors/param-invalid-error'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, ok, serverError } from 'presentation/helpers/http'
import { HttpRequest } from 'presentation/protocols/http-request'
import { GetHistoryStockController } from './get-history-stock-controller'

const makeFakeHistoryStockPricingModel = (): HistoryStockPricingModel => ({
  closing: 10,
  high: 10,
  low: 10,
  opening: 10,
  pricedAt: 'any_priced_at'
})

const makeFakeHistoryStockModel = (): HistoryStockModel => ({
  name: 'any_name',
  prices: [makeFakeHistoryStockPricingModel()]
})

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

const makeGetHistoryStockUsecaseStub = () => {
  class GetHistoryStockUsecaseStub implements GetHistoryStockUsecase {
    async getHistory (stockName: string, fromDate: Date, toDate: Date): Promise<HistoryStockModel> {
      return makeFakeHistoryStockModel()
    }
  }

  return new GetHistoryStockUsecaseStub()
}

const makeSut = () => {
  const isoDateValidationStub = makeIsoDateValidationStub()
  const getHistoryStockUsecaseStub = makeGetHistoryStockUsecaseStub()
  const sut = new GetHistoryStockController(isoDateValidationStub, getHistoryStockUsecaseStub)

  return { sut, isoDateValidationStub, getHistoryStockUsecaseStub }
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

  test('should return 500 if isoDateValidation throws', async () => {
    const { sut, isoDateValidationStub } = makeSut()
    jest.spyOn(isoDateValidationStub, 'isIsoDateValid').mockImplementationOnce(() => {
      throw new Error('')
    })
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError())
  })

  test('should call getHistoryStockUsecase with correct values', async () => {
    const { sut, getHistoryStockUsecaseStub } = makeSut()
    const getHistorySpy = jest.spyOn(getHistoryStockUsecaseStub, 'getHistory')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(getHistorySpy).toHaveBeenLastCalledWith(request.params.stockName, request.query.fromDate, request.query.toDate)
  })

  test('should return 500 if getHistoryStockUsecase throws', async () => {
    const { sut, getHistoryStockUsecaseStub } = makeSut()
    jest.spyOn(getHistoryStockUsecaseStub, 'getHistory').mockRejectedValueOnce(new Error())
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError())
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok(makeFakeHistoryStockModel()))
  })
})
