import { env } from 'main/config/env'
import { AlphaVantageService } from './alpha-vantage-service'

const token = env.alphaVantageToken

const makeSut = () => {
  const sut = new AlphaVantageService(token)

  return { sut }
}

describe('AlphaVantageService', () => {
  test('should return an LastStockModel', async () => {
    const { sut } = makeSut()

    const lastStockModel = await sut.getLastStock('IBM')

    expect(lastStockModel).toBeTruthy()
    expect(lastStockModel.name).toBeTruthy()
    expect(lastStockModel.lastPrice).toBeTruthy()
    expect(lastStockModel.pricedAt).toBeTruthy()
  })

  test('should return an HistoryStockModel', async () => {
    const { sut } = makeSut()

    const historyStockModel = await sut.getHistoryStock('IBM', new Date(2020, 10, 1), new Date(2020, 11, 1))

    expect(historyStockModel).toBeTruthy()
    expect(historyStockModel.name).toBeTruthy()
    expect(historyStockModel.prices).toBeTruthy()
  })
})
