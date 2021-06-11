export class ParamNotProvidedError extends Error {
  constructor (param: string) {
    super(`Param not provided: ${param}`)
    this.name = 'ParamNotProvidedError'
  }
}
