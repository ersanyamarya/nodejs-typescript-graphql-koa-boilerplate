import httpStatusCode from '../utils/http-status-code'

export default class InternalError extends Error {
  public name = 'InternalError'
  public status = httpStatusCode.SERVER_ERROR
  public message = this.message || `Oops 🤞, Something is wrong with me 😢`
}
