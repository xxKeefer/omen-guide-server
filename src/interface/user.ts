import { PassportLocalDocument } from 'mongoose'
import { Express } from 'express'
export default interface UserInterface extends PassportLocalDocument {
  username: string
  password: string
  roles: string[]
}

export interface UserDataInterface extends Express.User {
  username: string
  roles: string[]
}

export interface AuthenticationData {
  username: string
  roles: string[]
}

export interface DatabaseUserInterface extends UserInterface {
  username: string
  password: string
  roles: string[]
  _id: string
}
