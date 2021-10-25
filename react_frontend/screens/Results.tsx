import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";
import { Attraction } from "../components/Types";

function Results(props: any) { // { results: [{ title: string, startTime: number, endTime: number, tags: [{ name: string }] }] }

  return (
    <View style={styles.container}>
      {global.foundEvents.map((result: Attraction) =>
        <MaterialCardWithImageAndTitle
          key={result.id}
          title={result.name}
          startTime={new Date(result.startTime)}
          endTime={new Date(result.endTime)}
          style={styles.materialCardWithImageAndTitle}
        ></MaterialCardWithImageAndTitle>
      )}
      {global.foundEvents.length == 0 &&
        <>
          <Text>No Results Found...</Text>
        </>
      }
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
    marginTop: 27,
    alignSelf: "center"
  }
});

export default Results;
