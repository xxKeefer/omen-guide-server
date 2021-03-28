import { Router } from 'express'
import {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
  getUsers
} from '../../controller/auth'

export const router = Router()

router.route('/signup').post(createUser)

router.route('/login').post(loginUser)

router.route('/logout').get(logoutUser)

router.route('/session').get(sessionCheck)

//testing
router.route('/users').get(getUsers)
