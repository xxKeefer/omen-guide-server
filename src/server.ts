import dotenv from './lib/env'
import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import session, { SessionOptions } from 'express-session'

// EXPRESS CONFIG
dotenv //imports dotenv if in dev env
const app: Application = express()
const port: string = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: false }))

//DATABASE
const dbURL: string =
  process.env.NODE_ENV === 'test'
    ? <string>process.env.DB_URL_TEST
    : <string>process.env.DB_URL

// MONGOOSE CONFIGURATION
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('DB :: connected successfully.')
})

//SESSION CONFIGURATION
const expiry = new Date(new Date().getDate() + 14) // date 14 days in future

const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET || 'cookie cat',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: { expires: expiry, httpOnly: false },
  store: MongoStore.create({ mongoUrl: dbURL })
}

if (process.env.NODE_ENV === 'production') {
  sessionConfig!.cookie!.sameSite = 'none' // allow cross-site usage of cookies
  sessionConfig!.cookie!.secure = true // secures cookies
}
app.enable('trust proxy') //stamps the cookie to tell client it is secure
app.use(session(sessionConfig))

//PASSPORT CONFIGURATION
import './middleware/passport'
app.use(passport.initialize())
app.use(passport.session())

//API ROUTES
import { router as apiRoutes } from './api/apiRoutes'
app.use('/api', apiRoutes)

// SERVER CONFIG
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('PORT :: Listening @ port:' + port)
})

module.exports = { server, app } //export for testing
