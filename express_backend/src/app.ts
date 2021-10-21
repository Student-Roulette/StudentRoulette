import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cron from 'node-cron'
import https from 'https'

// Cron pattern to run daily
// (don't worry about it)
const DAILY = "0 1 * * *";
const MINUTELY = "* * * * *";

const options = {
  hostname: 'api.presence.io',
  //port: 443,
  path: '/twin-cities-umn/v1/events',
  method: 'GET'
}

const scrape_events = async () => {
  const req = https.request(options, (res) => {
    console.log("Requesting!")
    res.on('data', (events) => {
      events.forEach(async (event) => {
        console.log(`Adding event with name: ${event.eventName}`);
        const attraction = await prisma.attraction.create({
          data: {
            name: event.eventName,
            description: event.description,
            startTime: events.startDateTimeUtc, 
            endTime: events.endDateTimeUtc,
            presenceId: events.eventNoSqlId,
          }
        });
        console.log(`Created attraction with id: ${attraction.name}`)
      });
    })
  });
  req.on('error', error => {
    console.error(error)
  });
  req.end();
};

cron.schedule(MINUTELY, () => {
  console.log("Daily!")  
})

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('.env file not found');
}

//scrape_events();
const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT 
scrape_events();

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
