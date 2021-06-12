import { IsoDateValidation } from 'domain/validations/iso-date-validation'

export class IsoDateValidationImpl implements IsoDateValidation {
  isIsoDateValid (isoDate: string): boolean {
    try {
      return new Date(isoDate).toISOString() === isoDate
    } catch (err) {
      return false
    }
  }
}
