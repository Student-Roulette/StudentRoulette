import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import { htmlParse } from "./util";

// Cron pattern to run daily
// (don't worry about it)
const DAILY = "0 1 * * *";
//const MINUTELY = "* * * * *";

export interface Event {
  eventName: string;
  description?: string;
  startDateTimeUtc: Date;
  endDateTimeUtc: Date;
  eventNoSqlId: string;
  location: string;
  organizationName: string;
  tags: string[];
}

const upsert_events = async (verbose = false) => {
  console.log("Updating (upserting) events!");
  const res = await axios.get(
    "https://api.presence.io/twin-cities-umn/v1/events"
  );
  const events: Event[] = res.data as Event[];
  events?.forEach(async (event) => {
    const tag_inserts = event.tags.map((tag) => ({
      where: {
        name: tag,
      },
      create: {
        name: tag,
      },
    }));
    const attraction = await prisma.attraction.upsert({
      where: {
        presenceId: event.eventNoSqlId,
      },
      update: {
        name: event.eventName,
        description: htmlParse(event.description),
        address: event.location,
        schedule: {
          create: {
            times: {
              create: {
                startTime: event.startDateTimeUtc,
                endTime: event.endDateTimeUtc,
              },
            },
          },
        },
        tags: { connectOrCreate: tag_inserts },
      },
      create: {
        name: event.eventName,
        description: htmlParse(event.description),
        address: event.location,
        schedule: {
          create: {
            times: {
              create: {
                startTime: event.startDateTimeUtc,
                endTime: event.endDateTimeUtc,
              },
            },
          },
        },
        presenceId: event.eventNoSqlId,
        tags: { connectOrCreate: tag_inserts },
      },
    });
    if (verbose) {
      console.log(`Upserted event with name ${attraction.name}`);
    }
  });
  console.log("Updated (upserting) events!");
};

cron.schedule(DAILY, () => {
  upsert_events();
});

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(".env file not found");
}

//scrape_events();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Social Coding!");
});

app.get("/events", async (req, res) => {
  const attractions = await prisma.attraction.findMany();
  res.json(attractions);
});

app.get("/up", async (req, res) => {
  res.send("Server up!");
});

app.post("/event", async (req, res) => {
  console.log(req.body);
  const { name, description, address, startTime, endTime } = req.body;
  const result = await prisma.attraction.create({
    data: {
      name,
      description,
      address,
      schedule: {
        create: {
          times: {
            create: {
              startTime: startTime,
              endTime: endTime,
            },
          },
        },
      },
    },
  });
  res.json(result);
});

app.get("/event/:id", async (req, res) => {
  const { id } = req.params;
  const event = await prisma.attraction.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(event);
});

// GET /tags/list
app.get(`/tags/list`, async (req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
});

// GET tags/relations
app.get("/tags/relations/:name", async (req, res) => {
  const { name } = req.params;
  const relations = await prisma.tag.findUnique({
    where: {
      name: String(name),
    },
    select: {
      parent: true,
      children: true,
    },
  });
  res.json(relations);
});

// TODO - POST /tags/new

// DEL /event/:id
app.delete(`/event/:id`, async (req, res) => {
  const { id } = req.params;
  const event = await prisma.attraction.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(event);
});

// TODO GET /event/group
// TODO GET /event/ongoing
// TODO GET /event/tag/:tag
// TODO PUT /event/:id

// DEL /groups/:id
app.delete(`/groups/:id`, async (req, res) => {
  const { id } = req.params;
  const event = await prisma.group.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(event);
});

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`);
});
