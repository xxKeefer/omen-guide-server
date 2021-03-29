import mongoose, { Schema } from 'mongoose'
import TokenInterface from '../interface/token'

const EXPIRE_TTL = 60 * 60 * 24 * 7
// const EXPIRE_TTL = 90

const TokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true },
    forUser: { type: String, required: true },
    expires: { type: Date, expires: EXPIRE_TTL, default: Date.now() }
  },
  { timestamps: true }
)

export default mongoose.model<TokenInterface>('Token', TokenSchema)
