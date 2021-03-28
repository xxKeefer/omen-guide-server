import dotenv from './lib/env'
import express, { Application } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { router as apiRoutes } from './api/apiRoutes'

// EXPRESS CONFIG
dotenv //imports dotenv if in dev env
const app: Application = express()
const port: string = process.env.PORT || '5000'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: false }))

//TODO: fuck db for a hot second. lets just use a array and get that whole thing going

//DATABASE
// const database: string =
//   process.env.NODE_ENV === 'test'
//     ? <string>process.env.DB_URL_TEST
//     : <string>process.env.DB_URL

// mongoose.connect(database, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// })
// const db = mongoose.connection
// db.on('error', (error) => console.log(error))
// db.once('open', () => {
//   if (process.env.NODE_ENV !== 'test')
//     console.log('DB :: connected successfully.')
// })

//API ROUTES
app.use('/api', apiRoutes)

// SERVER CONFIG
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('PORT :: Listening @ port:' + port)
})

module.exports = { server, app } //export for testing
