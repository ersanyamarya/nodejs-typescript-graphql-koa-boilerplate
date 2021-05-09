import Router from 'koa-router'

import appConfig from '../../config/app'
import httpStatusCode from '../../utils/http-status-code'

import createUser from './handlers/create-user'
import login from './handlers/login'

import { getAllUsers, updateRole } from './handlers/admin-users'

import { createUserValidation, loginValidation, updateRoleValidation } from './validations'

import { validateBodyMiddleware, validateParameterMiddleware } from '../../middlewares/validate'

import { authenticateMiddleware, adminRoutesMiddleware } from '../../middlewares/auth'

const router = new Router()

router.post(`/${appConfig.name}/auth/register`, validateBodyMiddleware(createUserValidation), async ctx => {
  const { firstName, lastName, email } = await createUser(ctx.request.body)
  ctx.body = {
    message: `Great! You are registered with us now. Cheers 🍻`,
    data: { name: `${firstName} ${lastName}`, email },
  }
  ctx.status = httpStatusCode.CREATED
})

router.post(`/${appConfig.name}/auth/login`, validateBodyMiddleware(loginValidation), async ctx => {
  ctx.body = {
    message: `Great! You are successfully logged in 👍`,
    data: await login(ctx.request.body),
  }
  ctx.status = httpStatusCode.OK
})

router.get(`/${appConfig.name}/auth/users`, authenticateMiddleware(), adminRoutesMiddleware(), async ctx => {
  ctx.body = {
    message: `All the users in the system ✅`,
    data: await getAllUsers(),
  }
  ctx.status = httpStatusCode.OK
})

router.patch(
  `/${appConfig.name}/auth/users/change-role/:userID/:role`,
  validateParameterMiddleware(updateRoleValidation),
  authenticateMiddleware(),
  adminRoutesMiddleware(),
  async ctx => {
    ctx.body = {
      message: `Updated Role ✅`,
      data: await updateRole(ctx.params),
    }
    ctx.status = httpStatusCode.OK
  }
)

export default router
