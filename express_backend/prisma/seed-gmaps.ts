import { arrayBuffer } from "stream/consumers";

interface Schedule {
    // As the specific dates don't matter but TS requires dates, we will use the week of 8/1/21.
    // E.g.: 8/1/21 = Sun, 8/2/21 = Mon, ..., 8/7/21 = Sat
    times: Date[]; // {SunStart, SunStop, MonStart, MonStop... SatStart, SatStop}
}

interface Attraction {
    name: string;
    address: string;
    attractionSchedule: Schedule;
    tag: string;
}

function parse_date(d : string) {
    let weekDate = d.split(", ")[0];
    let time = d.split(", ")[1];
    
    let dateToReturn : Date = new Date();

    dateToReturn.setMonth(8);
    dateToReturn.setFullYear(2021);
    dateToReturn.setSeconds(0);
    dateToReturn.setMilliseconds(0);
    switch(weekDate) {
        case "Sunday": {
            dateToReturn.setDate(1);
            break;
        }
        case "Monday": {
            dateToReturn.setDate(2);
            break;
        }
        case "Tuesday": {
            dateToReturn.setDate(3);
            break;
        }
        case "Wednesday": {
            dateToReturn.setDate(4);
            break;
        }
        case "Thursday": {
            dateToReturn.setDate(5);
            break;
        }
        case "Friday": {
            dateToReturn.setDate(6);
            break;
        }
        case "Saturday": {
            dateToReturn.setDate(7);
            break;
        }
    }

    let startTime = dateToReturn;
    let endTime = dateToReturn;

    if (time == "Closed") {
        startTime.setHours(0);
        startTime.setMinutes(0);
        endTime.setHours(0);
        endTime.setMinutes(0);

        return [startTime, endTime];
    }
    else if (time == "Open 24 hours") {
        startTime.setHours(0);
        startTime.setHours(0);
        endTime.setHours(23);
        endTime.setMinutes(59);
    
        return [startTime, endTime];
    }
    else {
        let startTimeString = time.split("–")[0]; // 7:30AM
        let endTimeString = time.split("–")[1];   // 8:30AM

        let startTimeArr = startTimeString.split(":"); // {"7", "30AM"} or {"7AM"}
        let endTimeArr = startTimeString.split(":");

        if (startTimeArr.length == 1) {
            if (startTimeArr[0].split("AM").length == 2) {
                startTimeArr = startTimeArr[0].split("AM");
                startTimeArr.push("AM");
            }
            else {
                startTimeArr = startTimeArr[1].split("PM");
                startTimeArr.push("PM");
            }
        }
        else {
            if (startTimeArr[1].split("AM").length == 2) {
                let tempArr : string[] = [];
                tempArr.push(startTimeArr[0]);
                tempArr.push(startTimeArr[1].split("AM")[0]);
                tempArr.push("AM");
                startTimeArr = tempArr;
            }
            else {
                let tempArr : string[] = [];
                tempArr.push(startTimeArr[0]);
                tempArr.push(startTimeArr[1].split("PM")[0]);
                tempArr.push("PM");
                startTimeArr = tempArr;
            }
        }

        if (endTimeArr.length == 1) {
            if (endTimeArr[0].split("AM").length == 2) {
                endTimeArr = endTimeArr[0].split("AM");
                endTimeArr.push("AM");
            }
            else {
                endTimeArr = endTimeArr[1].split("PM");
                endTimeArr.push("PM");
            }
        }
        else {
            if (endTimeArr[1].split("AM").length == 2) {
                let tempArr : string[] = [];
                tempArr.push(endTimeArr[0]);
                tempArr.push(endTimeArr[1].split("AM")[0]);
                tempArr.push("AM");
                endTimeArr = tempArr;
            }
            else {
                let tempArr : string[] = [];
                tempArr.push(endTimeArr[0]);
                tempArr.push(endTimeArr[1].split("PM")[0]);
                tempArr.push("PM");
                endTimeArr = tempArr;
            }
        }

        // After this: {"7", "30", "AM"} or {"7", "AM"}
        
        if (parseInt(startTimeArr[0]) == 12) {
            startTimeArr[0] = "0";
        }

        if (startTimeArr[startTimeArr.length - 1] == "AM") {
            startTime.setHours(parseInt(startTimeArr[0]));
        }
        else {
            startTime.setHours(parseInt(startTimeArr[0]) + 12);
        }

        if (startTimeArr.length == 3) {
            startTime.setMinutes(parseInt(startTimeArr[1]));
        }
        else {
            startTime.setMinutes(0);
        }

        if (parseInt(endTimeArr[0]) == 12) {
            endTimeArr[0] = "0";
        }

        if (endTimeArr[endTimeArr.length - 1] == "AM") {
            endTime.setHours(parseInt(endTimeArr[0]));
        }
        else {
            endTime.setHours(parseInt(endTimeArr[0]) + 12);
        }

        if (endTimeArr.length == 3) {
            endTime.setMinutes(parseInt(endTimeArr[1]));
        }
        else {
            endTime.setMinutes(0);
        }

        return [startTime, endTime];
    }
}

const seed_gmaps = async (verbose = false) => {
    var fs = require('fs');
    fs.readFile('google-maps.csv', function (err: any, data: any) {
        if (err) {
            return console.log(err);
        }

        // Store csv file into temp variable.
        let tempArr : string[] = data.toString().split('\r\n').split(',');
        let temp2DArr : string[][] = [];

        while (tempArr.length != 0) {
            temp2DArr.push(tempArr.splice(0, 10));
        }

        let attractions : Attraction[] = [];

        for (let i = 1; i < temp2DArr.length; i++) {
            let name : string = temp2DArr[i][0];
            let address : string = temp2DArr[i][1];
            let tag : string = temp2DArr[i][2];

            let times : Date[] = [];

            for (let j = 3; j < 9; j++) {
                let tempDateArr = parse_date(temp2DArr[i][j]);
                times.push(tempDateArr[0]);
                times.push(tempDateArr[1]);
            }

            let sched : Schedule = {} as Schedule;
            sched.times = times;
            
            let att : Attraction = {} as Attraction;
            att.name = name;
            att.address = address;
            att.tag = tag;
            att.attractionSchedule = sched;

            attractions.push(att);
        }

        // Add attractions to db.

    })
};