import { PassportLocalDocument } from 'mongoose'

export default interface UserInterface extends PassportLocalDocument {
  email: string
  password: string
  username: string
  roles: string[]
}
