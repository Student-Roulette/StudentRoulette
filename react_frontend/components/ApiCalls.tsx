import { Attraction } from "./Types";

const GetEvents = async (take: number = 0, skip: number = 0) => {

    let events: Attraction[] = [];

    try {
        const response = await fetch('http://localhost:3000/events/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        let data = await response.json();
        data.forEach((event: any) => {
            let newEvent: Attraction = new Attraction();
            Object.entries(event).forEach((property: any) => {
                newEvent[property['0']] = property['1'];
            });
            events.push(newEvent);
        });
        return events;

    } catch (error) {
        console.error(error)
    }
    return events;
};


export default GetEvents;