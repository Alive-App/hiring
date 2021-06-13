import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetStockGainsController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.query.purchasedAmount) {
      return badRequest(new ParamNotProvidedError('purchasedAmount'))
    }
    if (!httpRequest.query.purchasedAt) {
      return badRequest(new ParamNotProvidedError('purchasedAt'))
    }
    return badRequest(new ParamNotProvidedError('stockName'))
  }
}
