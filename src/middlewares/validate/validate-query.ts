import { Context, Next } from 'koa'
import { ObjectSchema } from 'joi'
import ValidationError from '../../errors/ValidationError'
export default (schema: ObjectSchema) => async (ctx: Context, next: Next): Promise<void> => {
  const { error } = schema.validate(ctx.request.body, { abortEarly: false })
  if (error) {
    throw new ValidationError(error.details)
  } else await next()
}
