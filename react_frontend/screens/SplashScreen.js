import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialButtonViolet2 from "../components/MaterialButtonViolet2";

function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <MaterialButtonViolet2
        style={styles.materialButtonViolet2}
      ></MaterialButtonViolet2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 24,
    marginTop: 96
  },
  materialButtonViolet2: {
    height: 65,
    width: 175,
    marginTop: 27,
    marginLeft: 100
  }
});

export default SplashScreen;
