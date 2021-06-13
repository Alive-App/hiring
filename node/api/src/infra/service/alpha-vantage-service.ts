import axios, { AxiosInstance } from 'axios'
import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { GetHistoryStockService } from 'data/protocols/get-history-stock-service'
import { GetStockByDateService } from 'data/protocols/get-stock-by-date-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { alphaVantageDateToIsoDate } from 'infra/helpers/date-helpers'
import { HistoryStockModel, HistoryStockPricingModel } from 'domain/models/history-stock-model'
import { StockByDateModel } from 'domain/models/stock-by-date-model'

export type IntervalType = '1min' | '5min' | '15min' | '30min' | '60min'

export type OutputsizeType = 'compact' | 'full'

export type TimeSeriesIntradayItemType = {
  [dateTime: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string
  }
}

export type TimeSeriesIntradayType = {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Interval': string
    '5. Output Size': string
    '6. Time Zone': string
  },
  'Time Series (1min)'?: TimeSeriesIntradayItemType
  'Time Series (5min)'?: TimeSeriesIntradayItemType
  'Time Series (15min)'?: TimeSeriesIntradayItemType
  'Time Series (30min)'?: TimeSeriesIntradayItemType
  'Time Series (60min)'?: TimeSeriesIntradayItemType
}

export type TimeSeriesDailyItemType = {
  [dateTime: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. adjusted close': string
    '6. volume': string
    '7. dividend amount': string
    '8. split coefficient': string
  }
}

export type TimeSeriesDailyType = {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Output Size': string
    '5. Time Zone': string
  },
  'Time Series (Daily)': TimeSeriesDailyItemType
}

export class AlphaVantageService implements GetLastStockService, GetHistoryStockService, GetStockByDateService {
  private api: AxiosInstance

  constructor (
    private readonly token: string
  ) {
    this.api = axios.create({
      baseURL: 'https://www.alphavantage.co/query?'
    })
  }

  private async timeSeriesIntraday (
    symbol: string,
    interval: IntervalType = '1min',
    outputsize: OutputsizeType = 'compact'
  ) {
    const { data } = await this.api.get<TimeSeriesIntradayType>('', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        apikey: this.token,
        symbol,
        interval,
        outputsize
      }
    })

    return data
  }

  private async timeSeriesDaily (
    symbol: string,
    outputsize: OutputsizeType = 'full'
  ) {
    const { data } = await this.api.get<TimeSeriesDailyType>('', {
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        apikey: this.token,
        symbol,
        outputsize
      }
    })

    return data
  }

  async getLastStock (stockName: string): Promise<LastStockModel> {
    const data = await this.timeSeriesIntraday(stockName)

    if (!data['Meta Data']) {
      throw new Error()
    }

    const lastRefreshed = data['Meta Data']['3. Last Refreshed']

    if (!data['Time Series (1min)']) {
      throw new Error()
    }

    const lastTimeSeries = data['Time Series (1min)'][lastRefreshed]

    return {
      lastPrice: Number(lastTimeSeries['4. close']),
      name: stockName,
      pricedAt: alphaVantageDateToIsoDate(lastRefreshed)
    }
  }

  async getHistoryStock (stockName: string, fromDate: Date, toDate: Date): Promise<HistoryStockModel> {
    const data = await this.timeSeriesDaily(stockName)
    const prices: HistoryStockPricingModel[] = []

    const keys = Object.keys(data['Time Series (Daily)'])

    for (const key of keys) {
      const stockDate = new Date(key)

      if (stockDate >= fromDate && stockDate <= toDate) {
        const stock = data['Time Series (Daily)'][key]
        prices.push({
          opening: Number(stock['1. open']),
          closing: Number(stock['4. close']),
          high: Number(stock['2. high']),
          low: Number(stock['3. low']),
          pricedAt: alphaVantageDateToIsoDate(key)
        })
      }
    }

    return { name: stockName, prices }
  }

  async getStockByDate (stockName: string, date: Date): Promise<StockByDateModel> {
    const data = await this.timeSeriesDaily(stockName)
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    const stockByDate: StockByDateModel = {} as StockByDateModel

    const keys = Object.keys(data['Time Series (Daily)'])

    for (const key of keys) {
      const stockDate = new Date(key)
      const dayStock = stockDate.getDay()
      const monthStock = stockDate.getMonth()
      const yearStock = stockDate.getFullYear()

      if (day === dayStock && month === monthStock && year === yearStock) {
        const stock = data['Time Series (Daily)'][key]
        stockByDate.lastPrice = Number(stock['4. close'])
        stockByDate.name = stockName
        stockByDate.pricedAt = alphaVantageDateToIsoDate(key)
      }
    }

    if (!stockByDate) {
      throw new Error()
    }

    return stockByDate
  }
}
