

const GetEvents = async () => {
    try {
        const response = await fetch('http://localhost:3000/events/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json();
        return JSON.parse(json);
    } catch (error) {
        console.error(error)
    }
};


export default GetEvents;