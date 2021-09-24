import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Social Coding!')
})

app.get('/events', async (req, res) => {
  const events = await prisma.event.findMany()
  res.json(events)
})

app.get('/up', async (req, res) => {
  res.send('Server up!')
})

app.post('/event', async (req, res) => {
  const { title, description, authorEmail } = req.body
  const result = await prisma.event.create({
      data: {
        title,
        description,
        author: { 
          connect: { 
            email: authorEmail 
          } 
        }
      }
  })
  res.json(result)
})

app.get('/event/:id', async (req, res) => {
  const { id } = req.params
  const event = await prisma.event.findUnique({ 
    where: { 
      id: Number(id), 
    }
  })
  res.json(event)
})

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`)
})
