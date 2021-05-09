import NotFoundError from '../../../errors/NotFoundError'
import User, { UserDocument } from '../models/User'

async function getAllUsers(): Promise<UserDocument[]> {
  return await User.find(
    {},
    {
      __v: false,
      password: false,
    }
  )
}

type UpdateRoleInput = {
  userID: string
  role: 'ADMIN' | 'USER'
}

async function updateRole({ userID, role }: UpdateRoleInput): Promise<string> {
  const user = await User.findById(userID)
  if (!user) throw new NotFoundError(`Didn't found any user with id: ${userID}`)
  await User.findByIdAndUpdate(userID, { role })
  return `Update role for ${user.firstName} ${user.lastName} to ${role}`
}
export { getAllUsers, updateRole }
