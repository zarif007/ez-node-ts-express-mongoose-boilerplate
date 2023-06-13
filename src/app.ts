import express, { Request, Response, Express } from 'express'
const app: Express = express()
import cors from 'cors'

// Cors setup
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hell')
})

export default app
