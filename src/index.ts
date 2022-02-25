import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createUser, getUserLastUpdated, updateUser } from './datahandler'
import rateLimit from 'express-rate-limit'

const startupTime = new Date().getTime()

const main = async (): Promise<void> => {
  const app: Express = express()

  // Middleware
  app.use(express.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: true // Disable the `X-RateLimit-*` headers
    })
  )

  //create user
  app.post(
    '/',
    async (req, res): Promise<void> => {
      if (
        !req.body ||
        !req.body.username ||
        typeof req.body.username !== 'string' ||
        req.body.username.length < 1 ||
        !req.body.password ||
        typeof req.body.password !== 'string' ||
        req.body.password.length < 1
      ) {
        res.sendStatus(400)
        return
      }
      try {
        await createUser(req.body.username, req.body.password)
      } catch (e) {
        res.sendStatus(500)
        return
      }
      res.sendStatus(201)
    }
  )

  //update user
  app.put(
    '/',
    async (req, res): Promise<void> => {
      if (
        !req.body ||
        !req.body.username ||
        typeof req.body.username !== 'string' ||
        req.body.username.length < 1 ||
        !req.body.password ||
        typeof req.body.password !== 'string' ||
        req.body.password.length < 1
      ) {
        res.sendStatus(400)
        return
      }
      try {
        await updateUser(req.body.username, req.body.password)
      } catch (e) {
        res.sendStatus(500)
        return
      }

      res.sendStatus(201)
    }
  )

  //fetch user status
  app.get(
    '/',
    async (req, res): Promise<void> => {
      if (
        !req.query ||
        !req.query.username ||
        typeof req.query.username !== 'string' ||
        req.query.username.length < 1
      ) {
        res.sendStatus(400)
        return
      }
      let lastupdated = null
      try {
        lastupdated = await getUserLastUpdated(req.query.username)
      } catch (e) {
        res.sendStatus(500)
        return
      }
      res.send({ lastupdated })
    }
  )

  //fetch server status
  app.get(
    '/status',
    async (_req, res): Promise<void> => {
      res.send({ startupTime })
    }
  )

  app.listen(process.env.PORT || 1337, (): void => {
    console.log(`Server running on ${1337}`)
  })
}

main()
