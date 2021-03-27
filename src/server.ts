import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { router as apiRoutes } from './api/apiRoutes'

dotenv.config({ path: `${__dirname}/.env` })
// EXPRESS CONFIG
const app: Application = express()
const port: string = process.env.PORT || '8080'

//API ROUTES
app.use('/api', apiRoutes)

// SERVER CONFIG
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test')
    console.log('PORT :: Listening @ port:' + port)
})

module.exports = { server, app } //export for testing
