export class ParamInvalidError extends Error {
  constructor (param: string) {
    super(`Invalid param: ${param}`)
    this.name = 'ParamInvalidError'
  }
}
