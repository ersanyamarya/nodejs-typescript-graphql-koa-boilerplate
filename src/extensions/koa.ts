import Koa, { Context } from 'koa'
import cors from 'koa2-cors'
import Router from 'koa-router'
import { Logger } from 'log4js'
import serverConfig from '../config/server'

import requestLoggerMiddleware from '../middlewares/request-logger'

import server from './apollo'

import { UserObject } from '../modules/auth/types'
interface HealthCheck {
  connected?: boolean
  status?: string
}

type HealthChecks = {
  [service: string]: () => HealthCheck
}
declare module 'koa' {
  interface BaseContext {
    user?: UserObject
  }
}
export default (logger: Logger, healthChecks?: HealthChecks): Koa => {
  const app = new Koa()
  // app.use(helmet())
  // app.use(requestID())
  app.use(requestLoggerMiddleware(logger))
  // app.use(errorHandlerMiddleware(logger))
  app.use(cors({ origin: '*' }))
  // app.use(bodyParser())

  const router = new Router()
  router.get(`${serverConfig.healthPath}`, async (ctx: Context) => {
    const checks = { server: true }
    if (healthChecks) {
      Object.entries(healthChecks).forEach(([service, callback]) => {
        checks[service] = callback()
      })
    }
    ctx.body = checks
  })

  // server().applyMiddleware({ app })
  // app.use(docRoutes.routes())
  // app.use(authRoutes.routes())
  router.post('/graphql', server().getMiddleware())
  router.get('/graphql', server().getMiddleware())
  // app.use(server().getMiddleware())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}
