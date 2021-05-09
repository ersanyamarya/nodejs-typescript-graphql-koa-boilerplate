import httpStatusCode from '../utils/http-status-code'
export default class ForbiddenError extends Error {
  public name = 'ForbiddenError'
  public status = httpStatusCode.FORBIDDEN
  public message = `Hey, You can't be here. 👽`
}
