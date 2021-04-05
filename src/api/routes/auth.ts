import { Router } from 'express'
import passport from 'passport'
import { authenticateUser, authenticateAdmin } from '../../middleware/auth'
import {
  createUser,
  loginUser,
  logoutUser,
  sessionCheck,
  getUsers
} from '../../controller/auth'

export const router = Router()

router.route('/signup').post(createUser)

router.route('/login').post(passport.authenticate('local'), loginUser)

router.route('/logout').delete(logoutUser)

//testing
router.route('/users').get(authenticateAdmin, getUsers)

router.route('/session').get(authenticateUser, sessionCheck)
