// TODO: rewrite with Faker
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
	{
		email: "hydri001@umn.edu",
		name: "Sasha Hydrie"
	},
	{
		email: "ocon0574@umn.edu",
		name: "Magnus O'Connor"
	}
]
const eventData: Prisma.EventCreateInput[] = [
	{
		title: 'Event 1',
		description: 'This is filler event 1',
		author: { 
			connect: { 
				email: "hydri001@umn.edu"
			} 
		}
	},
	{
		title: 'Event 2',
		description: 'This is filler event 2',
		author: { 
			connect: { 
				email: "hydri001@umn.edu"
			} 
		}
	},
	{
		title: 'Event 3',
		description: 'This is filler event 3',
		author: { 
			connect: { 
				email: "hydri001@umn.edu"
			} 
		}
	},
	{
		title: 'Event 4',
		description: 'This is filler event 4',
		author: { 
			connect: { 
				email: "hydri001@umn.edu"
			} 
		}
	},
	{
		title: 'Event 5',
		description: 'This is filler event 5',
		author: { 
			connect: { 
				email: "hydri001@umn.edu"
			} 
		}
	},
	{
		title: 'Running Club',
		description: 'This is an event created by Magnus.',
		author: { 
			connect: { 
				email: "ocon0574@umn.edu"
			} 
		}
	},
]

async function main() {
	console.log(`Seeding users...`)
	for (const u of userData) {
		const user = await prisma.user.create({
		data: u,
		})
		console.log(`Created event with id: ${user.id}`)
	}
	console.log(`Seeded users.`)
	console.log(`Seeding events...`)
	for (const e of eventData) {
		const event = await prisma.event.create({
		data: e,
		})
		console.log(`Created event with id: ${event.id}`)
	}
	console.log(`Seeded events.`)
	console.log(`Seeding finished.`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})