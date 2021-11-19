const GetDummyAttractions = () => {
    let TEMP_DATA: Attraction[] = [];
    for (var i = 0;i<10;i++){
      var time: Date = new Date();
      TEMP_DATA.push({id:i, createdAt:time.toString(),updatedAt:time.toString(), name:`Thing_${i}`, startTime:`${i}`, endTime:`${i+1}`});
    }
    return TEMP_DATA
}

export default GetDummyAttractions