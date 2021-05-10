import { Context, Next } from 'koa'
import authConfig from '../../config/auth'
import UnauthorizedError from '../../errors/UnauthorizedError'
import verifyToken from '../../modules/auth/services/verify-token'
export default () =>
  async (ctx: Context, next: Next): Promise<void> => {
    const AUTH_HEADER = ctx.headers[authConfig.jwt.header.toLowerCase()]

    if (!AUTH_HEADER) {
      throw new UnauthorizedError('No authorization token provided.')
    }

    const parts: string[] = (AUTH_HEADER as string).split(' ')
    if (parts.length > 2 || parts[0].toLowerCase() !== 'bearer') {
      throw new UnauthorizedError('No correct authorization token provided.')
    }

    ctx.user = verifyToken(parts[1])

    await next()
  }
