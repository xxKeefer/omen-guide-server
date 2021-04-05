import dotenv from './lib/env'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

dotenv //imports dotenv if in dev env
const dbURL: string =
  process.env.NODE_ENV === 'test'
    ? <string>process.env.DB_URL_TEST
    : <string>process.env.DB_URL

mongoose.connect(dbURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('DB :: connected successfully.')
})

// Middleware
const app = express()
const port: string = process.env.PORT || '8080'
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
const storeConfig = { mongoUrl: dbURL, ttl: 7 * 24 * 60 * 60 }
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'cookie cat',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create(storeConfig)
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session())
import './lib/passportConfig'

//API ROUTES
import { router as apiRoutes } from './api/apiRoutes'
app.use('/api', apiRoutes)

// SERVER CONFIG
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('PORT :: Listening @ port:' + port)
})

module.exports = { server, app } //export for testing
