import Mongoose, { Schema, Document } from 'mongoose'

const ROLES = ['ADMIN', 'USER']
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
)

interface User {
  firstName: string
  lastName: string
  email: string
  role: string
  password: string
}
export interface UserDocument extends User, Document {}
// export interface UserModel extends Model<UserDocument> {}

export default Mongoose.model<UserDocument>('User', UserSchema)
