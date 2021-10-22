import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

function MaterialCardWithImageAndTitle(props: any) {

  const getTimeString = (hours: number, minutes: number): string => {
    let tmpDate: Date = new Date();

    if (hours !== undefined) {
      tmpDate.setHours(hours, minutes);
    }

    let curPeriod = tmpDate.getHours() > 12 ? "PM" : "AM";

    if (props.handleTimeChange !== undefined) {
      props.handleTimeChange(props.text, tmpDate);
    }

    return `${tmpDate.getHours() > 12 ? tmpDate.getHours() - 12 : tmpDate.getHours()}:${String(tmpDate.getMinutes()).padStart(2, '0')} ${curPeriod}`;
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleOfEvent}>{props.title}</Text>
          <Text style={styles.hoursStartEnd}>Hours: {getTimeString(props.startTime?.getHours(), props.startTime?.getMinutes())} - {getTimeString(props.endTime?.getHours(), props.endTime?.getMinutes())}</Text>
        </View>
        <Image
          source={require("../assets/images/cardImage.png")}
          style={styles.cardItemImagePlace}
        ></Image>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity style={styles.actionButton1}>
          <Text style={styles.tag1}>TAG #1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton2}>
          <Text style={styles.tag2}>TAG #2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    flex: 1
  },
  titleOfEvent: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  hoursStartEnd: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 80,
    width: 80,
    margin: 16
  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  },
  actionButton1: {
    padding: 8,
    height: 36
  },
  tag1: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  },
  actionButton2: {
    padding: 8,
    height: 36
  },
  tag2: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  }
});

export default MaterialCardWithImageAndTitle;
