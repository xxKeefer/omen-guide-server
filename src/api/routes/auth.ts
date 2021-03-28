import { Router } from 'express'
import { authenticateToken } from '../../middleware/auth'
import {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
  getUsers,
  newToken
} from '../../controller/auth'

export const router = Router()

router.route('/signup').post(createUser)

router.route('/login').post(loginUser)

router.route('/logout').delete(logoutUser)

router.route('/token').post(newToken)

//testing
router.route('/users').get(getUsers)

router.route('/session').get(authenticateToken, sessionCheck)
