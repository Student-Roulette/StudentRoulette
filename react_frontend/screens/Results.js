import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";

function Results(props) {
  return (
    <View style={styles.container}>
      <MaterialCardWithImageAndTitle
        style={styles.materialCardWithImageAndTitle}
      ></MaterialCardWithImageAndTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialCardWithImageAndTitle: {
    height: 166,
    width: 325,
    marginTop: 78,
    alignSelf: "center"
  }
});

export default Results;
