import { Request, Response } from 'express'
import { Controller } from 'presentation/protocols/controller'
import { HttpRequest } from 'presentation/protocols/http-request'

export const expressControllerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      query: req.query
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
