import { PrismaClient, Prisma } from '@prisma/client'

class Tag {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: String;
    parentID: number;
}

class Attraction {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: String;
    description: String;
    startTime: Date;
    endTime: Date;
    tags: Tag[];
}

let attractionList: Array<Attraction>;

function retrieveTag(tag : Tag) {
    return {
        id: tag.id,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        name: tag.name,
        parentID: tag.parentID,
    }
}

function retrieveAttraction(attraction : Attraction) {
	return {
        id : attraction.id,
        createdAt: attraction.createdAt,
        updatedAt: attraction.updatedAt,
		name: attraction.name,
        description: attraction.description,
		startTime: attraction.startTime,
		endTime: attraction.endTime,
        tags: attraction.tags,
	}
}

function pullFromMaps() {

}

async function pushToDB() {
    console.log('Attempting to push to DB...')
    const prisma = new PrismaClient()

    /*
    console.log(`Pushing tags to DB...`)
	for (let i = 0; i < tagList.length; i++) {
		const tag = await prisma.tag.create({
		    data: retrieveTag(tagList[i]),
		})
		console.log(`Created tag with id: ${tag.id}`)
	}
    console.log(`Pushed tags to DB.`)
    */

    console.log(`Pushing attractions to DB...`)
    for (let i = 0; i < attractionList.length; i++){
        const attraction = await prisma.attraction.create({
            data: retrieveAttraction(attractionList[i]),
		})
        console.log(`Pushed attraction to DB with id: ${attraction.id}`)
    }
    console.log(`Pushed attractions to DB.`)
    console.log(`Pushing to DB finished.`)
}