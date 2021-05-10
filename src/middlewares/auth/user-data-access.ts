import { Context, Next } from 'koa'

import ForbiddenError from '../../errors/ForbiddenError'
export default () =>
  async (ctx: Context, next: Next): Promise<void> => {
    if (ctx.user._id === ctx.request.body._id || ctx.user._id === ctx.request.body.userID || ctx.user.role === 'ADMIN')
      await next()
    else throw new ForbiddenError()
  }
