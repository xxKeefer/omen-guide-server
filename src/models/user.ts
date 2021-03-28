import mongoose, { Schema } from 'mongoose'
import UserInterface from '../interface/user'

const UserSchema = new Schema<UserInterface>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: Array, required: true, default: ['user'] }
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
