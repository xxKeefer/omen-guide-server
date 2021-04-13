import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req?.body
  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  )
    return res.status(400).json({ error: 'Bad Request.' })

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser)
      return res.status(409).json({ message: 'User Already Exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username,
      password: hashedPassword
    })
    return res
      .status(201)
      .json({ _id: newUser._id, username: newUser.username })
  } catch (error) {
    return res.status(201).json({ message: error.message })
  }
}

export const loginUser = (res: Response): Response => {
  return res.status(200).json({ message: 'User logged in.' })
}

export const logoutUser = (req: Request, res: Response) => {
  req.logout()
  res.status(204).json({ message: 'Session destroyed.' })
}

//TESTING PURPOSES
export const getUsers = async (res: Response): Promise<Response> => {
  return res.json(await User.find({}))
}

export const sessionCheck = (req: Request, res: Response): Response => {
  return res.status(200).json({ user: req.user })
}
