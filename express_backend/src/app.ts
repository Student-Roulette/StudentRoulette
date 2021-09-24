import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Social Coding!')
})

app.get('/events', async (req, res) => {
  const events = await prisma.event.findMany()
  res.json(events)
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
