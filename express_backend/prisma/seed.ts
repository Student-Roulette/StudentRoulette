import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Event } from "../src/app";
import { htmlParse } from "../src/util";

export interface GroupInsert {
  name: string;
  verified: boolean;
  creatorId: number;
}

const prisma = new PrismaClient();

const seed_events = async (verbose = false) => {
  const res = await axios.get(
    "https://api.presence.io/twin-cities-umn/v1/events"
  );
  const events: Event[] = res.data as Event[];
  if (Array.isArray(events)) {
    const groups = Array.from(
      events.reduce((acc: Set<string>, el: Event) => {
        acc.add(el.organizationName);
        return acc;
      }, new Set<string>())
    ).map<GroupInsert>((group_name: string) => {
      return {
        name: group_name,
        verified: true,
        creatorId: 0,
      };
    });
    await prisma.group.createMany({
      data: { ...groups },
    });
    for (const event of events) {
      const tag_inserts = event.tags.map((tag) => ({
        where: {
          name: tag,
        },
        create: {
          name: tag,
        },
      }));
      const attraction = await prisma.attraction.create({
        data: {
          name: event.eventName,
          description: htmlParse(event.description),
          address: event.location,
          group: {
              where: {
                name: event.organizationName,
              }
          },
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
        console.log(`Created attraction with name: ${attraction.name}`);
      }
    }
  }
};

async function main() {
  /*
	console.log(`Seeding tags...`);
	for (let i = 0; i < 10; i++) {
		const tag = await prisma.tag.create({
		data: generateTag(),
		})
		console.log(`Created tag with id: ${tag.id}`)
	}
	console.log(`Seeded tags.`);
	*/
  console.log(`Seeding attractions...`);
  seed_events(true);
  console.log(`Seeded attractions.`);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
