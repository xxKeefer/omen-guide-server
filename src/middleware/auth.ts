import { Request, Response, NextFunction } from 'express'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next()
  } else {
    res.status(403).json({ message: 'You are not authorized to see that.' })
  }
  next()
}
