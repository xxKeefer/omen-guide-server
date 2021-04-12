import { Router } from 'express'
import { router as auth } from './routes/auth'
import { router as guide } from './routes/guide'

export const router = Router()

// for testing up status of API
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is active.' })
})

// ROUTES
router.use('/auth', auth)
router.use('/guide', guide)
