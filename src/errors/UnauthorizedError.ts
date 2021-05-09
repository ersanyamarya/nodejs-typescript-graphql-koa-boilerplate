import httpStatusCode from '../utils/http-status-code'

export default class UnauthorizedError extends Error {
  public name = 'UnauthorizedError'
  public status = httpStatusCode.UNAUTHORIZED
  public message = this.message || 'Are you sure, you are signed in ⁉️'
}
