import dotenv from './lib/env'
import express, { Application } from 'express'
import { router as apiRoutes } from './api/apiRoutes'

// EXPRESS CONFIG
dotenv //imports dotenv if in dev env
const app: Application = express()
const port: string | undefined = process.env.PORT

//API ROUTES
app.use('/api', apiRoutes)

// SERVER CONFIG
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('PORT :: Listening @ port:' + port)
})

module.exports = { server, app } //export for testing
