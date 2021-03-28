import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = <UserObj>{
      username: req.body.username,
      password: hashedPassword,
      roles: ['user']
    }
    tempDB.push(user)
    return res.status(201).send()
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = <UserObj>(
    tempDB.find((user) => (user.username = req.body.username))
  )
  if (user === null) return res.status(400).json({ err: 'Cannot find user.' })

  try {
    const passwordsMatch: Boolean = await bcrypt.compare(
      req.body.password,
      user.password
    )
    return passwordsMatch
      ? authenticateUser(res, user.username)
      : res.status(403).json({ err: 'Declined.' })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const logoutUser = (req: Request, res: Response): Response => {
  //TODO: make this a database call
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  return res.sendStatus(204)
}

export const newToken = (req: Request, res: Response): void | Response => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  //TODO: make this a database call
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(
    refreshToken,
    <string>process.env.REFRESH_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403)
      return res
        .status(200)
        .json({ accessToken: generateAccessToken(user.username) })
    }
  )
}

//HELPERS
const generateAccessToken = (username: string): string => {
  const userData = { username }
  const accessToken = jwt.sign(
    userData,
    <string>process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  )
  return accessToken
}

const generateRefreshToken = (username: string): string => {
  const userData = { username }
  const refreshToken = jwt.sign(
    userData,
    <string>process.env.REFRESH_TOKEN_SECRET
  )
  //TODO: make this a database call
  refreshTokens.push(refreshToken)
  return refreshToken
}

const authenticateUser = (res: Response, username: string): Response => {
  return res.status(200).json({
    accessToken: generateAccessToken(username),
    refreshToken: generateRefreshToken(username)
  })
}

//TESTING PURPOSES
export const getUsers = (req: Request, res: Response): Response => {
  return res.json(tempDB)
}

export const sessionCheck = (req: Request, res: Response): Response => {
  return res.status(200).json({ user: req.body.user })
}

//TODO: make this a mongo Schema
type UserObj = {
  username: string
  password: string
  roles: string[]
}

//TODO: make this a mongoDB document
const tempDB: Array<UserObj> = []
//TODO: make this a mongoDB document
let refreshTokens: Array<string> = []
