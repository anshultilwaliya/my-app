import 'dotenv/config'
import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from "@sentry/node"
import connectDB from './config/db.js'
import { clerkWebhooks } from './controller/webhooks.js'

// initialize
const app = express()

// connect to db
await connectDB()

// middleware
app.use(cors())

// webhook route: express.json() se PEHLE, raw body ke saath
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

app.use(express.json())

// routes
app.get('/', (req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!")
})

// Sentry error handler: sabhi routes ke BAAD
Sentry.setupExpressErrorHandler(app)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})