import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cron from 'node-cron'
import axios from 'axios'

// Cron pattern to run daily
// (don't worry about it)
const DAILY = "0 1 * * *";
const MINUTELY = "* * * * *";

const upsert_events = async (verbose=false) => {
  console.log("Updating (upserting) events!")
  axios.get('https://api.presence.io/twin-cities-umn/v1/events')
    .then((res => {
      const events = res.data;
      if (Array.isArray(events)) {
        events.forEach(async (event) => {
          const attraction = await prisma.attraction.upsert({
            where: {
              presenceId: event.eventNoSqlId,
            },
            update: {
              name: event.eventName,
              description: event.description,
              startTime: event.startDateTimeUtc, 
              endTime: event.endDateTimeUtc,
            },
            create: {
              name: event.eventName,
              description: event.description,
              startTime: event.startDateTimeUtc, 
              endTime: event.endDateTimeUtc,
              presenceId: event.eventNoSqlId,
            },
          });
          if (verbose) {
            console.log(`Upserted event with name ${event.eventName}`)
          }
        })
      }
    }));
}

cron.schedule(DAILY, () => {
  upsert_events();
})

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('.env file not found');
}

//scrape_events();
const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT 

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Social Coding!')
})

app.get('/events', async (req, res) => {
  const attractions = await prisma.attraction.findMany()
  res.json(attractions)
})

app.get('/up', async (req, res) => {
  res.send('Server up!')
})

app.post('/event', async (req, res) => {
  console.log(req.body)
  const { name, description, startTime, endTime } = req.body
  const result = await prisma.attraction.create({
      data: {
        name,
        description,
        startTime,
        endTime,
      }
  })
  res.json(result)
})

app.get('/event/:id', async (req, res) => {
  const { id } = req.params
  const event = await prisma.attraction.findUnique({ 
    where: { 
      id: Number(id), 
    }
  })
  res.json(event)
})

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`)
})
