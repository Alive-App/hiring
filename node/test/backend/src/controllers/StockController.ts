import { Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import api from '../services/api'

interface IQuoteResponse {
  'Global Quote': {
    '01. symbol': string
    '05. price': string
    '07. latest trading day': string
  }
}

class StockController {
  async quote(request: Request, response: Response) {
    const { stock_name } = request.params
    const { data } = await api.get<IQuoteResponse>('query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: stock_name
      }
    })

    if (!data['Global Quote'] || !data['Global Quote']['01. symbol']) {
      throw new AppError('Symbol not found', 404)
    }

    return response.send({
      name: data['Global Quote']['01. symbol'],
      lastPrice: Number(data['Global Quote']['05. price']),
      pricedAt: data['Global Quote']['07. latest trading day']
    })
  }
}

export default new StockController()
