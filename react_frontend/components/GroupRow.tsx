import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Card, Avatar, Badge } from "react-native-paper";

/*
 

*/

function GroupRow(props: any) {
  return (
    <Card style = {[styles.cardStyle,styles.cardShadow]}>
      {props.UpcomingEvent ? 
      <Card.Title 
      title={props.Name}
      subtitle={"{Insert Group Leadership Role Here}"}
      left={(props) => <Avatar.Image size={70} source={require("../assets/images/cardImage.png")}/>}
      right={(props) => <Badge size={30}>!</Badge>}
      leftStyle={styles.left}
      />
      :
      <Card.Title 
      title={props.Name}
      subtitle={"{Insert Group Leadership Role Here}"}
      left={(props) => <Avatar.Image size={70} source={require("../assets/images/cardImage.png")}/>}
      leftStyle={styles.left}
      />}
    </Card> 
  );
}

const styles = StyleSheet.create({
  cardStyle:{
    padding:10, 
    margin:10, 
    backgroundColor:"#eddfdf"
  },
  cardShadow:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  left:{
    marginRight:35
  }
});

export default GroupRow;
