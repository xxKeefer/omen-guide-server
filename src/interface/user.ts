import { PassportLocalDocument } from 'mongoose'

export default interface UserInterface extends PassportLocalDocument {
  username: string
  password: string
  roles: string[]
}
export interface DatabaseUserInterface extends UserInterface {
  username: string
  password: string
  roles: string[]
  _id: string
}
