import { Document, model, Schema } from 'mongoose'
import TC from './TC'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

interface User extends Document {
  name: string
  userID: string
}

const UserModel = model<User>('User', UserSchema, 'users')

const { ResourceTC, queries, mutations } = TC(UserModel)

export { UserModel, ResourceTC }
export default { queries, mutations, ResourceTC }
