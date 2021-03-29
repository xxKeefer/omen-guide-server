import { Document } from 'mongoose'

export default interface TokenInterface extends Document {
  token: string
  forUser: string
  expires: Date
}
