import { IsoDateValidation } from 'data/protocols/iso-date-validation'
import { GetHistoryStockUsecase } from 'domain/usecases/get-history-stock-usecase'
import { ParamInvalidError } from 'presentation/errors/param-invalid-error'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, serverError } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetHistoryStockController implements Controller {
  constructor (
    private readonly isoDateValidation: IsoDateValidation,
    private readonly getHistoryStockUsecase: GetHistoryStockUsecase
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockName } = httpRequest.params
      const { fromDate, toDate } = httpRequest.query
      if (!fromDate) {
        return badRequest(new ParamNotProvidedError('fromDate'))
      }
      if (!this.isoDateValidation.isIsoDateValid(fromDate)) {
        return badRequest(new ParamInvalidError('fromDate'))
      }
      if (!toDate) {
        return badRequest(new ParamNotProvidedError('toDate'))
      }
      if (!this.isoDateValidation.isIsoDateValid(toDate)) {
        return badRequest(new ParamInvalidError('toDate'))
      }
      await this.getHistoryStockUsecase.getHistory(stockName, fromDate, toDate)
      return badRequest(new ParamNotProvidedError('stockName'))
    } catch (err) {
      return serverError()
    }
  }
}
