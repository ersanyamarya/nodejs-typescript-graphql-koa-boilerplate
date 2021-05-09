import jwt from 'jsonwebtoken'

import tokenConfig from '../../../config/token'
import UnauthorizedError from '../../../errors/UnauthorizedError'
import { UserObject } from '../types'

const verifyOptions = {
  issuer: tokenConfig.options.issuer,
  expiresIn: tokenConfig.options.expiresIn,
  algorithm: [tokenConfig.options.algorithm],
}

export default (token: string): UserObject => {
  try {
    jwt.verify(token, tokenConfig.key.public, verifyOptions)
    return jwt.decode(token, { complete: true }).payload.user
  } catch (error) {
    throw new UnauthorizedError(`The request can't be processed due to invalid App Authorization token.`)
  }
}
