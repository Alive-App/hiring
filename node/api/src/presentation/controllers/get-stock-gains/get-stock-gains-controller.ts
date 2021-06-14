import { GetStockGainsUsecase } from 'domain/usecases/get-stock-gains-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, ok, serverError } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetStockGainsController implements Controller {
  constructor (
    private readonly getStockGainsUsecase: GetStockGainsUsecase
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.stockName) {
        return badRequest(new ParamNotProvidedError('stockName'))
      }
      if (!httpRequest.query.purchasedAmount) {
        return badRequest(new ParamNotProvidedError('purchasedAmount'))
      }
      if (!httpRequest.query.purchasedAt) {
        return badRequest(new ParamNotProvidedError('purchasedAt'))
      }

      const purchasedAtDate = new Date(httpRequest.query.purchasedAt)

      const stockGains = await this.getStockGainsUsecase.getGains(httpRequest.params.stockName, httpRequest.query.purchasedAmount, purchasedAtDate)
      return ok(stockGains)
    } catch (err) {
      return serverError()
    }
  }
}
