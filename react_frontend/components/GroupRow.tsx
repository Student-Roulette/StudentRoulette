import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

function GroupRow(props: any) {
  return (
    <View style={styles.container}>
    <Image
        source={require("../assets/images/cardImage.png")}
        style={styles.GroupIMG}
    ></Image>
      <Text style={styles.GroupTitle}>{props.Name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems:"center",
        height: 60,
        margin: 10
    },
    GroupIMG:{
        height:60,
        width:60,
        borderRadius:60/2
    },
    GroupTitle:{
        fontSize:20,
        marginLeft:30
    }
});

export default GroupRow;
