import { CompareStocksUsecase } from 'domain/usecases/compare-stocks-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, serverError } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class CompareStocksController implements Controller {
  constructor (
    private readonly compareStocksUseCase: CompareStocksUsecase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!Array.isArray(httpRequest.body.stocks)) {
        return badRequest(new ParamNotProvidedError('stocks'))
      }
      if (httpRequest.body.stocks.length === 0) {
        return badRequest(new ParamNotProvidedError('stocks'))
      }

      await this.compareStocksUseCase.compare(httpRequest.body.stocks)

      return badRequest(new ParamNotProvidedError('stockName'))
    } catch (err) {
      return serverError()
    }
  }
}
