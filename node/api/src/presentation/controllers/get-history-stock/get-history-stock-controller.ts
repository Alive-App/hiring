import { IsoDateValidation } from 'data/protocols/iso-date-validation'
import { ParamInvalidError } from 'presentation/errors/param-invalid-error'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetHistoryStockController implements Controller {
  constructor (
    private readonly isoDateValidation: IsoDateValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.query.fromDate) {
      return badRequest(new ParamNotProvidedError('fromDate'))
    }
    if (!this.isoDateValidation.isIsoDateValid(httpRequest.query.fromDate)) {
      return badRequest(new ParamInvalidError('fromDate'))
    }
    if (!httpRequest.query.toDate) {
      return badRequest(new ParamNotProvidedError('toDate'))
    }
    if (!this.isoDateValidation.isIsoDateValid(httpRequest.query.toDate)) {
      return badRequest(new ParamInvalidError('toDate'))
    }
    return badRequest(new ParamNotProvidedError('stockName'))
  }
}
