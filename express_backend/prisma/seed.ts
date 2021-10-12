// TODO: rewrite with Faker
import { PrismaClient, Prisma } from '@prisma/client'
import * as faker from 'faker'

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

async function main() {
	console.log(`Seeding tags...`)
	for (let i = 0; i < 10; i++) {
		const tag = await prisma.tag.create({
		data: generateTag(),
		})
		console.log(`Created tag with id: ${tag.id}`)
	}
	console.log(`Seeded tags.`)
	console.log(`Seeding attractions...`)
	for (let i = 0; i < 50; i++) {
		const attraction = await prisma.attraction.create({
		data: generateAttraction(),
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