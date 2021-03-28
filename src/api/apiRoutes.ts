import { Router } from 'express'
import { router as auth } from './routes/auth'

export const router = Router()

// for testing up status of API
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is active.' })
})

router.use('/auth', auth)
