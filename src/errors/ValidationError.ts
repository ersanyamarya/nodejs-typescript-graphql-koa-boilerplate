import httpStatusCode from '../utils/http-status-code'

import { ValidationErrorItem } from 'joi'

export default class ValidationError extends Error {
  public violations
  public name = 'ValidationError'
  public status = httpStatusCode.UN_PROCESSABLE_ENTITY

  constructor(violations: ValidationErrorItem[]) {
    super('I doubt the sanity 🧴 for your data')
    this.violations = violations.map(violation => ({
      field: violation?.context?.key,
      message: violation?.message,
    }))
  }
}
