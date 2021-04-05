import { Request, Response, NextFunction } from 'express'
import UserInterface, { DatabaseUserInterface } from '../interface/user'
import User from '../models/user'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) return next()
  return res
    .status(403)
    .json({ message: 'You are not authorized to see that.' })
}

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user: authenticatedUser }: any = req
  if (!authenticatedUser)
    res.status(403).json({ message: 'You are not authorized to see that.' })

  try {
    const user: UserInterface | null = await User.findOne({
      username: authenticatedUser.username
    })
    if (!user?.roles.includes('admin'))
      return res
        .status(403)
        .json({ message: 'You are not authorized to see that.' })
    return next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
