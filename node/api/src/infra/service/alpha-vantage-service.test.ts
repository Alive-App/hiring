import { env } from 'main/config/env'
import { AlphaVantageService } from './alpha-vantage-service'

const token = env.alphaVantageToken

const makeSut = () => {
  const sut = new AlphaVantageService(token)

  return { sut }
}

describe('AlphaVantageService', () => {
  test('should return a LastStockModel', async () => {
    const { sut } = makeSut()

    const lastStockModel = await sut.getLastStock('IBM')

    expect(lastStockModel).toBeTruthy()
    expect(lastStockModel.name).toBeTruthy()
    expect(lastStockModel.lastPrice).toBeTruthy()
    expect(lastStockModel.pricedAt).toBeTruthy()
  })

  test('should return a HistoryStockModel', async () => {
    const { sut } = makeSut()

    const historyStockModel = await sut.getHistoryStock('IBM', new Date(2020, 10, 1), new Date(2020, 11, 1))

    expect(historyStockModel).toBeTruthy()
    expect(historyStockModel.name).toBeTruthy()
    expect(historyStockModel.prices).toBeTruthy()
  })

  test('should return a StockByDateModel', async () => {
    const { sut } = makeSut()

    const StockByDateModel = await sut.getStockByDate('IBM', new Date(2020, 4, 18))

    expect(StockByDateModel).toBeTruthy()
    expect(StockByDateModel.name).toBeTruthy()
    expect(StockByDateModel.lastPrice).toBeTruthy()
    expect(StockByDateModel.pricedAt).toBeTruthy()
  })

  test('should return a list string', async () => {
    const { sut } = makeSut()

    const availableStockNames = await sut.getAvailableStockNames('IBM')

    expect(availableStockNames).toBeTruthy()
  })
})
