import { Response } from 'express'

const Respond = (res: Response, status: number, message: string): Response => {
  const json: { [k: string]: any } = {}
  if (status < 300) {
    json.message = message
  } else {
    json.error = message
  }
  return res.status(status).json(json)
}

export default Respond
