import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, TextStyle, StyleProp } from "react-native";
import { TimePickerModal } from 'react-native-paper-dates';

function TimePicker(props: { date: Date, style: StyleProp<TextStyle>, text: string, handleTimeChange: (sender: string, date: Date) => any }) {
  let curDate: Date = props.date ?? new Date();
  const getTimeString = (hours?: number, minutes?: number): string => {
    if (hours !== undefined) {
      curDate.setHours(hours, minutes);
      setCurHours(curDate.getHours());
      setCurMins(curDate.getMinutes());
    }

    let curPeriod = curDate.getHours() > 12 ? "PM" : "AM";

    if (props.handleTimeChange !== undefined) {
      props.handleTimeChange(props.text, curDate);
    }

    return `${curDate.getHours() > 12 ? curDate.getHours() - 12 : curDate.getHours()}:${String(curDate.getMinutes()).padStart(2, '0')} ${curPeriod}`;
  }

  const [visible, setVisible] = React.useState(false)
  const [selectedTime, setSelectedTime] = React.useState<string>(() => getTimeString())
  const [curHours, setCurHours] = React.useState(curDate.getHours())
  const [curMins, setCurMins] = React.useState(curDate.getMinutes())

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setSelectedTime(getTimeString(hours, minutes));
    },
    [setVisible]
  );

  return (
    <>
      {visible &&
        <View style={styles.modal}>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={curHours}
            minutes={curMins}
          />
        </View>
      }
      <TouchableOpacity style={[styles.container, props.style]}
        onPress={() => setVisible(true)}>
        <Text>{props.text}
        </Text>
        <TextInput
          style={styles.inputStyle}
          editable={false}
          value={selectedTime}
        ></TextInput>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  modal: {
    position: "absolute",
    zIndex: 100,
    alignSelf: "center",
    top: "50%"
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8,
    cursor: "Pointer"
  }
});

export default TimePicker;
