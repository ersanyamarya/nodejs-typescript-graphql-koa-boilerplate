import YAML from 'yaml'
import appConfig from '../../config/app'

import generateDocumentation from './handlers/generate-documentation'

import Router from 'koa-router'
import httpStatusCode from '../../utils/http-status-code'

const router = new Router()

async function getJSON(ver): Promise<JSON> {
  return await YAML.parse(await generateDocumentation(Number.parseInt(ver)))
}

router.get(`/${appConfig.name}/docs/api/:version`, async ctx => {
  ctx.status = httpStatusCode.OK
  ctx.body = await generateDocumentation(Number.parseInt(ctx.params.version))
})

router.get(`/${appConfig.name}/docs/api/:version/json`, async ctx => {
  ctx.status = httpStatusCode.OK
  ctx.body = await getJSON(ctx.params.version)
})

export default router
