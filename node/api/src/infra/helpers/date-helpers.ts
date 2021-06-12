export const alphaVantageDateToIsoDate = (alphaVantageDate: string) => {
  const date = new Date(alphaVantageDate)
  return date.toISOString()
}
