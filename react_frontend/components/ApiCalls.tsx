

const GetAttractions = async () => {
    try {
        const response = await fetch('http://localhost:3000/events/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return await response.json() as Attraction[];
       // const json = await response.json();       
       // return JSON.parse();
    } catch (error) {
        console.error(error)
    }


    let emptyList : Attraction[] = [];
    return emptyList;
};


export default GetAttractions;