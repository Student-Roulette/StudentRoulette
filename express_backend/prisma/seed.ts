import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const seed_events = async (verbose = false) => {
  const res = await axios.get(
    "https://api.presence.io/twin-cities-umn/v1/events"
  );
  const events = res.data;
  if (Array.isArray(events)) {
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
          description: event.description,
          startTime: event.startDateTimeUtc,
          endTime: event.endDateTimeUtc,
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
