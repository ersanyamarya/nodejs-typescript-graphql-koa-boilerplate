import bcrypt from 'bcryptjs'

import NotFoundError from '../../../errors/NotFoundError'
import UnauthorizedError from '../../../errors/UnauthorizedError'

import User from '../models/User'
import { LoginInput, LoginResponse } from '../types'

import generateToken from '../services/generate-token'

export default async (input: LoginInput): Promise<LoginResponse> => {
  const user = await User.findOne(
    { email: input.email },
    {
      createdAt: false,
      updatedAt: false,
      __v: false,
    }
  )

  if (!user) throw new NotFoundError(`We are not friends yet ☹️. ${input.email} is not in our databases`)

  if (!(await bcrypt.compare(input.password, user.password)))
    throw new UnauthorizedError(`The user name and password doesn't match 😑`)

  user.password = undefined
  return generateToken(user)
}
