import { GetLastStockUseCase } from 'domain/usecases/get-last-stock-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, ok, serverError } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetLastStockController implements Controller {
  constructor (
    private readonly getLastStockUsecase: GetLastStockUseCase
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.stockName) {
        return badRequest(new ParamNotProvidedError('stockName'))
      }

      const lastStockData = await this.getLastStockUsecase.getLast(httpRequest.params.stockName)
      return ok(lastStockData)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
