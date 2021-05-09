import httpStatusCode from '../utils/http-status-code'

export default class UserAlreadyExists extends Error {
  public name = 'UnauthorizedError'
  public status = httpStatusCode.CONFLICT

  constructor(email: string) {
    super()
    this.message = `You are already registered friend 👍, with ${email}`
  }
}
