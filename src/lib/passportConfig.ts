import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/user'
import { DatabaseUserInterface } from '../interface/user'

const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    User.findOne({ username }, (error: Error, user: DatabaseUserInterface) => {
      if (error) throw error
      if (!user) return done(null, false)
      bcrypt.compare(password, user.password, (error, result: boolean) => {
        if (error) throw error
        if (result === true) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  })
)

passport.serializeUser((user: any, done) => {
  done(null, user._id)
})

passport.deserializeUser((id: string, done) => {
  User.findOne({ _id: id }, (error: Error, user: DatabaseUserInterface) => {
    const userInformation = {
      username: user.username,
      roles: user.roles,
      id: user._id
    }
    done(error, userInformation)
  })
})
