import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import InternalError from '../../../errors/InternalError'
import tokenConfig from '../../../config/token'
import { UserDocument } from '../models/User'
import { LoginResponse } from '../types'

type SigningOptions = {
  issuer: string
  subject: string
  audience: string
  expiresIn: string
  algorithm: string
  header: {
    jti: string
  }
}

function getSigningOptions(email: string): SigningOptions {
  return {
    issuer: tokenConfig.options.issuer,
    subject: email,
    audience: 'web-ui',
    expiresIn: tokenConfig.options.expiresIn,
    algorithm: tokenConfig.options.algorithm,
    header: {
      jti: uuid(),
    },
  }
}

export default (user: UserDocument): LoginResponse => {
  try {
    const token = jwt.sign({ user }, tokenConfig.key.private, getSigningOptions(user.email))
    return {
      token,
      tokenType: tokenConfig.type,
    }
  } catch (error) {
    throw new InternalError(error)
  }
}
