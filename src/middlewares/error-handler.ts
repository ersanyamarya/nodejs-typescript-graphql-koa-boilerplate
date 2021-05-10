import { Context, Next } from 'koa'
import httpStatusCode from '../utils/http-status-code'

import { Logger } from 'log4js'
export default (logger: Logger) =>
  async (ctx: Context, next: Next): Promise<void> => {
    try {
      await next()
    } catch ({ status = httpStatusCode.SERVER_ERROR, message, stack, violations = null }) {
      ctx.status = status
      ctx.body = { status, message }

      switch (status) {
        case httpStatusCode.SERVER_ERROR:
          logger.fatal({ status, message, method: ctx.method, id: ctx.state.id, stack, url: ctx.url })
          break
        case httpStatusCode.UN_PROCESSABLE_ENTITY:
          logger.warn({
            status,
            message,
            violations,
            method: ctx.method,
            id: ctx.state.id,
            user: ctx.user,
            url: ctx.url,
          })
          ctx.body = { ...ctx.body, violations }
          break
        case httpStatusCode.UNAUTHORIZED || httpStatusCode.FORBIDDEN:
          logger.warn({ status, message, method: ctx.method, id: ctx.state.id, user: ctx.user, url: ctx.url })
          break
        default:
          logger.error({ status, message, method: ctx.method, id: ctx.state.id, url: ctx.url })
          break
      }
    }
  }
