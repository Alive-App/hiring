import axios, { AxiosInstance } from 'axios'
import { GetLastStockService } from 'data/protocols/get-last-stock-service'
import { LastStockModel } from 'domain/models/last-stock-model'
import { alphaVantageDateToIsoDate } from 'infra/helpers/date-helpers'

export type IntervalType = '1min' | '5min' | '15min' | '30min' | '60min'

export type OutputsizeType = 'compact' | 'full'

export type TimeSeriesType = {
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
  'Time Series (1min)'?: TimeSeriesType
  'Time Series (5min)'?: TimeSeriesType
  'Time Series (15min)'?: TimeSeriesType
  'Time Series (30min)'?: TimeSeriesType
  'Time Series (60min)'?: TimeSeriesType
}

export class AlphaVantageService implements GetLastStockService {
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
}
