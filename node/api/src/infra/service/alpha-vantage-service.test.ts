import { AlphaVantageService } from './alpha-vantage-service'

const token = '9K7W6EG7WY0UKQYX'

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
})
