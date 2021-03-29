import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import Token from '../models/token'

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      roles: ['user']
    })
    return res.status(201).json(user)
  } catch (error) {
    return res.status(409).json({ err: 'Username is already taken.' })
  }
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await User.findOne({ username: req.body.username })
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

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await Token.deleteOne({ token: req.body.token })
  return res.sendStatus(204)
}

export const newToken = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  const isTokenValid = await checkRefreshToken(refreshToken)
  if (!isTokenValid) return res.sendStatus(403)

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

  return refreshToken
}

const checkRefreshToken = async (token: string): Promise<Boolean> => {
  const validToken = await Token.findOne({ token })

  return Boolean(validToken)
}

const authenticateUser = async (
  res: Response,
  username: string
): Promise<Response> => {
  const accessToken = generateAccessToken(username)
  const refreshToken = generateRefreshToken(username)

  try {
    const createdToken = await Token.create({
      token: refreshToken,
      forUser: username
    })

    if (createdToken) {
      return res.status(200).json({
        accessToken,
        refreshToken
      })
    } else {
      return res.sendStatus(500)
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

//TESTING PURPOSES
export const getUsers = (req: Request, res: Response): Response => {
  // Make this a mongo DB
  return res.json(User.find({}))
}

export const sessionCheck = (req: Request, res: Response): Response => {
  return res.status(200).json({ user: req.body.user })
}
