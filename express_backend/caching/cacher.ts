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
    descripion: String;
    startTime: Date;
    endTime: Date;
    tags: Tag[];
}

let attractionList: Array<Attraction>;

function pullFromMaps() {

}

function pushToDB() {
    
}