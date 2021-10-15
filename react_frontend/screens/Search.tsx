import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialButton from "../components/MaterialButton";
import TimePicker from "../components/TimePicker";
import { Picker } from "@react-native-picker/picker";

function Search(props: any) {
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [selectedTag, setSelectedTag] = React.useState();
  endTime.setHours(endTime.getHours() + 1);

  const startTimeLabel = "Start Time:";
  const endTimeLabel = "End Time:";

  const handleTimeChange = (sender: string, date: Date) => {
    console.log(`${sender} changed.`);
    switch (sender) {
      case startTimeLabel:
        setStartTime(date);
        break;
      case endTimeLabel:
        setEndTime(date);
      default:
        break;
    }
  }

  const handleSearchStart = () =>{
    props.navigation.navigate('Results',{results: [
      { title: "test1", startTime: {hours: startTime.getHours(), minutes:startTime.getMinutes()}, endTime: {hours: endTime.getHours(), minutes:endTime.getMinutes()}, tags: [{ name: "test" }] },
      { title: "test2", startTime: {hours: 5, minutes:15}, endTime: {hours: 15, minutes:45}, tags: [{ name: "test" }] }
    ] });
  }

  return (
    <View style={styles.container}>
      <TimePicker text={startTimeLabel}
        date={startTime}
        style={styles.inputBox}
        handleTimeChange={handleTimeChange}
      ></TimePicker>
      <TimePicker text={endTimeLabel}
        date={endTime}
        style={styles.inputBox}
        handleTimeChange={handleTimeChange}
      ></TimePicker>
      <Picker style={styles.inputBox} selectedValue={selectedTag}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTag(itemValue)
        }>
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Not Food" value="Not Food" />
      </Picker>
      <MaterialButton
        style={styles.searchButtonStyle}
        textStyle={styles.searchButtonTextStyle}
        onPress={() => handleSearchStart()}
        text="Search"
        icon="shopping-search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBox: {
    height: 43,
    width: 300,
    marginTop: 27,
    alignSelf: "center"
  },
  searchButtonStyle: {
    backgroundColor: "rgb(144,0,33)",
    marginTop: 27,
    alignSelf: "center"
  },
  searchButtonTextStyle:{
    fontSize:20
  }
});

export default Search;
