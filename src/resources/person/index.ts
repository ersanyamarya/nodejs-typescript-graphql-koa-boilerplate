import { Schema, Document, model } from 'mongoose'

const PersonSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
)

interface Person {
  firstName: string
  lastName: string
  email: string
}
export interface PersonDocument extends Person, Document {}

export default model<PersonDocument>('Person', PersonSchema, 'person')
