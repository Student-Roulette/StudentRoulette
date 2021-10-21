import { ServerResponse } from "http";

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

const apiKey = "AIzaSyC0nM4JMB8ZKRtiUe1dtraibHq38k9EajM";

let id = 0;

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

function pushToDB() {
    
}