// TODO: rewrite with Faker
import { PrismaClient, Prisma } from '@prisma/client'
import * as faker from 'faker'
import axios from 'axios'

const prisma = new PrismaClient()

function generateTag() {
	return {
		name: faker.commerce.color(),
	}	
}

function generateAttraction() {
	return {
		name: faker.company.companyName(),
		startTime: faker.date.future(),
		endTime: faker.date.future(),
	}
}

const seed_events = async (verbose=false) => {
  axios.get('https://api.presence.io/twin-cities-umn/v1/events')
	.then((res) => {
    const events = res.data;
    if (Array.isArray(events)) {
      events.forEach(async (event) => {
        const attraction = await prisma.attraction.create({
          data: {
            name: event.eventName,
            description: event.description,
            startTime: event.startDateTimeUtc, 
            endTime: event.endDateTimeUtc,
            presenceId: event.eventNoSqlId,
          }
        });
		if (verbose) {
			console.log(`Created attraction with name: ${attraction.name}`);
		}
    })
  }});
};


async function main() {
	console.log(`Seeding tags...`);
	for (let i = 0; i < 10; i++) {
		const tag = await prisma.tag.create({
		data: generateTag(),
		})
		console.log(`Created tag with id: ${tag.id}`)
	}
	console.log(`Seeded tags.`);
	console.log(`Seeding attractions...`);
	seed_events(true);
	console.log(`Seeded attractions.`);
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})