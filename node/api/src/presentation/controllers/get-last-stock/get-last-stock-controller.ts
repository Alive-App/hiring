import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetLastStockController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new ParamNotProvidedError('stockName'))
  }
}
