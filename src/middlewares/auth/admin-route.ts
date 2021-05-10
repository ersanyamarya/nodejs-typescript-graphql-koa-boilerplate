import { Context, Next } from 'koa'

import ForbiddenError from '../../errors/ForbiddenError'
export default () =>
  async (ctx: Context, next: Next): Promise<void> => {
    if (ctx.user.role !== 'ADMIN') throw new ForbiddenError()
    await next()
  }
