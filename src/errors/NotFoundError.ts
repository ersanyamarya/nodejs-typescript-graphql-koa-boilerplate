import httpStatusCode from '../utils/http-status-code'

export default class NotFoundError extends Error {
  public name = 'NotFound'
  public status = httpStatusCode.NOT_FOUND
  public message = this.message || `Hey, I don't know about this. 😕`
}
