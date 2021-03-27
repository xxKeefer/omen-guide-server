import { Router } from 'express'

export const router = Router()

// for testing up status of API
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is active.' })
})
