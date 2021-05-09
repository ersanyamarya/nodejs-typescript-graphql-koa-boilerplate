import bcrypt from 'bcryptjs'
import UserAlreadyExists from '../../../errors/UserAlreadyExists'
import User, { UserDocument } from '../models/User'
import { UserObject } from '../types'

export default async (input: UserObject): Promise<UserDocument> => {
  let user = await User.findOne({ email: input.email })
  if (user) throw new UserAlreadyExists(input.email)
  input.password = await bcrypt.hash(input.password, await bcrypt.genSalt(10))
  user = new User(input)
  return await user.save()
}
