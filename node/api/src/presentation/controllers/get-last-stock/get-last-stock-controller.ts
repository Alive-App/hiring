import { GetLastStockUseCase } from 'domain/usecases/get-last-stock-usecase'
import { ParamNotProvidedError } from 'presentation/errors/param-not-provided-error'
import { badRequest, serverError } from 'presentation/helpers/http'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'
import { HttpResponse } from 'presentation/protocols/http-response'

export class GetLastStockController implements Controller {
  constructor (
    private readonly getLastStockUsecase: GetLastStockUseCase
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.getLastStockUsecase.getLast(httpRequest.params.stockName)
      return badRequest(new ParamNotProvidedError('stockName'))
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
