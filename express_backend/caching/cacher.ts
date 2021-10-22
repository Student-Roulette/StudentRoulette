import { PrismaClient, Prisma } from '@prisma/client'

class Tag {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    parentID: number;
}

class Attraction {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    tags: Tag[];
}

let attractionList: Array<Attraction>;

const apiKey = "AIzaSyC0nM4JMB8ZKRtiUe1dtraibHq38k9EajM";

let id = 0;
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
        //id : attraction.id,
        //createdAt: attraction.createdAt,
        //updatedAt: attraction.updatedAt,
        name: attraction.name,
        description: attraction.description,
        startTime: attraction.startTime,
        endTime: attraction.endTime,
        // tags: attractionList[i].tags,
	}
}

function pullFromMaps() {
    var types = ["amusement_park", "aquarium", "art_gallery", "bakery", "bar", "beauty_salon", "bowling_alley", "cafe", "campground", "casino", "church", "gym", "hair_care",
                "hindu_temple", "library", "mosque", "movie_theater", "museum", "night_club", "park", "restaurant", "shopping_mall", "spa", "stadium", "store", "synagogue",
                "tourist_attraction", "zoo"];

    var axios = require('axios');    

    for (let i: 0; i < types.length; i++) {
        let apiURL: string =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json" +
                              "?location=44.973925%2C-93.233133"
                              "&key=" + apiKey +
                              "&language=en" +
                              "&radius=2415" +
                              "&type=" + types[i];
        var config = {
            method: 'get',
            url: apiURL,
            headers: { }
        };

        axios(config)
        .then(function (response) {
            for (var i = 0; i < response.data.results.length; i++) {
                var obj = response.data.results[i];
                var attract = new Attraction();

                attract.name = obj.name;
                //add hours lol
                attractionList.push(attract);
            }
        })
        .catch(function (error) {
            console.log(error);
        });    
    }
}

async function pushToDB() {
    console.log('Attempting to push to DB...')
    const prisma = new PrismaClient();

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
            data: retrieveAttraction(attractionList[i])
		})
        console.log(`Pushed attraction to DB with id: ${attraction.id}`)
    }
    console.log(`Pushed attractions to DB.`)
    console.log(`Pushing to DB finished.`)
}