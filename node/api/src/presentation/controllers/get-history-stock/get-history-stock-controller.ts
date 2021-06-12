import { IsoDateValidation } from 'domain/validations/iso-date-validation'
import { GetHistoryStockUsecase } from 'domain/usecases/get-history-stock-usecase'
import { ParamInvalidError } from 'presentation/errors/param-invalid-error'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, ok, serverError } from 'presentation/helpers/http'
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
      const { from, to } = httpRequest.query
      if (!stockName) {
        return badRequest(new ParamNotProvidedError('stockName'))
      }
      if (!from) {
        return badRequest(new ParamNotProvidedError('from'))
      }
      if (!this.isoDateValidation.isIsoDateValid(from)) {
        return badRequest(new ParamInvalidError('from'))
      }
      if (!to) {
        return badRequest(new ParamNotProvidedError('to'))
      }
      if (!this.isoDateValidation.isIsoDateValid(to)) {
        return badRequest(new ParamInvalidError('to'))
      }
      const fromDate = new Date(from)
      const toDate = new Date(to)
      const historyStock = await this.getHistoryStockUsecase.getHistory(stockName, fromDate, toDate)
      return ok(historyStock)
    } catch (err) {
      console.log(err)
      return serverError()
    }
  }
}
