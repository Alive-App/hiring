import { IsoDateValidationImpl } from './iso-date-validation'

const makeSut = () => {
  const sut = new IsoDateValidationImpl()

  return { sut }
}

describe('IsoDateValidationImpl', () => {
  test('should return true on success', () => {
    const { sut } = makeSut()
    const validIsoDate = '2021-06-11T22:26:00.000Z'
    const isValid = sut.isIsoDateValid(validIsoDate)
    expect(isValid).toBe(true)
  })
})
