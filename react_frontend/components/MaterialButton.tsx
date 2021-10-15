import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function MaterialButton(props: any) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      {props.icon !== undefined &&
        //https://icons.expo.fyi/ filter: MaterialCommunityIcons
        <MaterialCommunityIcons name={props.icon} style={[styles.icon, props.textStyle]}></MaterialCommunityIcons>
      }
      {props.text !== undefined &&
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(144,0,33)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    padding: 16
  },
  text: {
    color: "#fff",   
    textAlign: "center"
  },
  icon: {
    color: "#fff",
    alignSelf: "center",
    paddingRight: 8
  }
});

export default MaterialButton;
