import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import User from '../models/user'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })

    if (userExists?.username === username)
      return res.status(409).json({ err: 'Username is already taken.' })
    if (userExists?.email === email)
      return res
        .status(409)
        .json({ err: 'A user with that email already exists.' })

    const user = await User.create({
      username,
      email,
      password, //TODO:PASSWORD IS NOT HASHED >.<
      roles: ['user']
    })
    req.logIn(user, (err) => {
      if (err) return next(err)
    })
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
}

export const loginUser = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (req.user)
    return res
      .status(401)
      .json({ message: 'a user already authenticated, log out first.' })

  return passport.authenticate('local', (err, user) => {
    if (err) return next(err)
    if (!user)
      return res
        .status(404)
        .json({ message: 'username or password incorrect.' })
    req.logIn(user, (err) => {
      if (err) return next(err)
      return res.status(200).json(user)
    })
  })(req, res, next)
}

export const logoutUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'no user authenticated, login first.' })
  }
  return req.logOut()
}

//TESTING PURPOSES
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Make this a mongo DB
  return res.json(await User.find({}))
}

export const sessionCheck = (req: Request, res: Response): Response => {
  console.log(req.user)

  return res.status(200).json({ user: req.user, body: req.body })
}
