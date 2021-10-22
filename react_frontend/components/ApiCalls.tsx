const GetAttractions = async () => {
    try {
        const response = await fetch('http://localhost:3000/events/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        //TODO convert string dates into date type.
        let attractions : Attraction[] = await response.json();
        return attractions;
       // const json = await response.json();       
       // return JSON.parse();
    } catch (error) {
        console.error(error)
    }


    let emptyList : Attraction[] = [];
    return emptyList;
};


export default GetAttractions;