import { Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import {
  isValid,
  eachDayOfInterval,
  parseISO,
  isBefore,
  format
} from 'date-fns'
import api from '../services/api'

interface IQuoteResponse {
  'Global Quote': {
    '01. symbol': string
    '05. price': string
    '07. latest trading day': string
  }
}

type IPrices = {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
}

interface IHistoricResponse {
  'Meta Data': {
    '2. Symbol': string
    '3. Last Refreshed': string
  }
  'Time Series (Daily)': Array<IPrices>
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

    return response.status(200).json({
      name: data['Global Quote']['01. symbol'],
      lastPrice: Number(data['Global Quote']['05. price']),
      pricedAt: data['Global Quote']['07. latest trading day']
    })
  }

  async history(request: Request, response: Response) {
    const { stock_name } = request.params
    const { from, to } = request.query

    if (!from || !to) {
      throw new AppError('Date interval is required')
    }

    const start = parseISO(from as string)
    const end = parseISO(to as string)

    if (!isValid(start) || !isValid(end) || isBefore(end, start)) {
      throw new AppError('Date interval is not valid')
    }

    const intervalDays = eachDayOfInterval({
      start,
      end
    })

    const { data } = await api.get<IHistoricResponse>('/query', {
      params: {
        symbol: stock_name,
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        outputsize: 'full'
      }
    })

    if (
      !data['Meta Data'] ||
      !data['Meta Data']['2. Symbol'] ||
      data['Time Series (Daily)'].length === 0
    ) {
      throw new AppError('Symbol not found', 404)
    }

    const prices = intervalDays.map((date) => {
      const dateFormatted = format(date, 'yyyy-MM-dd')
      const price: IPrices = data['Time Series (Daily)'][dateFormatted]

      // probably closed market
      if (!price) {
        return {
          closed: true,
          pricedAt: dateFormatted
        }
      }

      return {
        opening: Number(price['1. open']),
        high: Number(price['2. high']),
        low: Number(price['3. low']),
        closing: Number(price['4. close']),
        pricedAt: dateFormatted
      }
    })

    return response.status(200).json({
      name: data['Meta Data']['2. Symbol'],
      prices
    })
  }

  async compare(request: Request, response: Response) {
    const { stock_name } = request.params
    const { stocks } = request.body

    if (!stocks || stocks.length === 0) {
      throw new AppError('Array of stocks is required')
    }

    const params = {
      function: 'GLOBAL_QUOTE'
    }

    const responsePrices = await Promise.all([
      api.get('query', {
        params: {
          ...params,
          symbol: stock_name
        }
      }),
      ...stocks.map((stock) =>
        api.get('query', {
          params: {
            ...params,
            symbol: stock
          }
        })
      )
    ]).catch(() => {
      throw new AppError('One or more stocks has not been found', 404)
    })

    const lastPrices = responsePrices.map(
      ({ data }: { data: IQuoteResponse }) => {
        if (!data['Global Quote']['01. symbol']) {
          throw new AppError('One stock not found', 404)
        }

        return {
          name: data['Global Quote']['01. symbol'],
          lastPrice: Number(data['Global Quote']['05. price']),
          pricedAt: data['Global Quote']['07. latest trading day']
        }
      }
    )

    return response.status(200).json({ lastPrices })
  }

  async gains(request: Request, response: Response) {
    const { stock_name } = request.params
    const { purchasedAmount, purchasedAt } = request.query

    if (!purchasedAmount || !purchasedAt || isNaN(Number(purchasedAmount))) {
      throw new AppError('Amount and date are required')
    }

    const purchasedDate = parseISO(purchasedAt as string)

    if (!isValid(purchasedDate) || !isBefore(purchasedDate, Date.now())) {
      throw new AppError('Purchased date must be a valid date')
    }

    const { data } = await api.get<IHistoricResponse>('/query', {
      params: {
        symbol: stock_name,
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        outputsize: 'full'
      }
    })

    if (
      !data['Meta Data'] ||
      !data['Meta Data']['2. Symbol'] ||
      data['Time Series (Daily)'].length === 0
    ) {
      throw new AppError('Symbol not found', 404)
    }

    try {
      const newPrice = Number(
        data['Time Series (Daily)'][data['Meta Data']['3. Last Refreshed']][
        '4. close'
        ]
      )

      const dateFormatted = format(purchasedDate, 'yyyy-MM-dd')
      const oldPrice = Number(
        data['Time Series (Daily)'][dateFormatted]['4. close']
      )

      const amount = Number(purchasedAmount)
      const valueGains = (newPrice - oldPrice) * amount

      return response.status(200).json({
        name: data['Meta Data']['2. Symbol'],
        purchasedAmount: amount,
        purchasedAt: dateFormatted,
        priceAtDate: oldPrice,
        lastPrice: newPrice,
        capitalGains: valueGains
      })
    } catch {
      throw new AppError('Prices not available, try another date')
    }
  }
}

export default new StockController()
