import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

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
      ? res.status(200).json({ msg: 'Success.' })
      : res.status(403).json({ msg: 'No match found.' })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const logoutUser = (): void => {}

export const sessionCheck = (): void => {}

//TESTING PURPOSES
export const getUsers = (req: Request, res: Response): Response => {
  return res.json(tempDB)
}

type UserObj = {
  username: string
  password: string
  roles: string[]
}
const tempDB: Array<UserObj> = []
