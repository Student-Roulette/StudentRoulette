// TODO: rewrite with Faker
import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from 'faker'

const prisma = new PrismaClient()

const tagData: Prisma.TagCreateInput[] = [
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

const attractionData: Prisma.AttractionCreateInput[] = [
	{
		email: "hydri001@umn.edu",
		name: "Sasha Hydrie"
	},
]

async function main() {
	console.log(`Seeding tags...`)
	for (const t of tagData) {
		const tag = await prisma.tag.create({
		data: t,
		})
		console.log(`Created tag with id: ${tag.id}`)
	}
	console.log(`Seeded tags.`)
	console.log(`Seeding attractions...`)
	for (const a of attractionData) {
		const attraction = await prisma.attraction.create({
		data: a,
		})
		console.log(`Created attraction with id: ${attraction.id}`)
	}
	console.log(`Seeded attractions.`)
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