import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user'
import { PassportLocalDocument } from 'mongoose'

passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

const canLogin = (user: PassportLocalDocument | null, password: string) => {
  if (user) {
    return user.authenticate(password)
  } else {
    return false
  }
}

const verifyCallback = async (email: string, password: string, done: any) => {
  try {
    const user = await User.findOne({ email })
    if (canLogin(user, password)) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    done(error)
  }
}

const fields = { usernameField: 'email' }

passport.use(new LocalStrategy(fields, verifyCallback))
