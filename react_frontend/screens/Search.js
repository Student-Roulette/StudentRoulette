import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import MaterialIconTextbox1 from "../components/MaterialIconTextbox1";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialDisabledTextbox from "../components/MaterialDisabledTextbox";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Search(props) {
  return (
    <View style={styles.container}>
      <MaterialIconTextbox
        style={styles.materialIconTextbox}
      ></MaterialIconTextbox>
      <MaterialIconTextbox1
        style={styles.materialIconTextbox1}
      ></MaterialIconTextbox1>
      <View style={styles.loremIpsumStack}>
        <Text style={styles.loremIpsum}></Text>
        <MaterialFixedLabelTextbox
          style={styles.materialFixedLabelTextbox}
        ></MaterialFixedLabelTextbox>
      </View>
      <MaterialDisabledTextbox
        style={styles.materialDisabledTextbox}
      ></MaterialDisabledTextbox>
      <MaterialButtonViolet1
        style={styles.materialButtonViolet1}
      ></MaterialButtonViolet1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialIconTextbox: {
    height: 43,
    width: 300,
    marginTop: 62,
    alignSelf: "center"
  },
  materialIconTextbox1: {
    height: 43,
    width: 300,
    marginTop: 17,
    alignSelf: "center"
  },
  loremIpsum: {
    top: 29,
    left: 89,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 300,
    position: "absolute",
    top: 0,
    left: 0
  },
  loremIpsumStack: {
    width: 300,
    height: 43,
    marginTop: 18,
    marginLeft: 38
  },
  materialDisabledTextbox: {
    height: 43,
    width: 300,
    marginTop: 16,
    marginLeft: 38,
    alignSelf: "center"
  },
  materialButtonViolet1: {
    height: 36,
    width: 100,
    marginTop: 30,
    alignSelf: "center"
  }
});

export default Search;
