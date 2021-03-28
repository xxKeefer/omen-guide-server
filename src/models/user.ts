import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from 'mongoose'

export type UserDocument = mongoose.Document & {
  email: string
  password: string
  roles: string[]

  tokens: AuthToken[]

  comparePassword: comparePasswordFunction
}

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void

export interface AuthToken {
  accessToken: string
  kind: string
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: Array, required: true, default: ['user'] }
})

module.exports = mongoose.model('User', userSchema)
