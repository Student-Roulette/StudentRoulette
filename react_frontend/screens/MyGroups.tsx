import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import MaterialButton from "../components/MaterialButton";
import GroupRow from "../components/GroupRow";

function MyGroups(props: any) {
  const TEMP_DATA = [
    {
      key:"1",
      Name:"Group Numero Uno",
      UpcomingEvent:true
    },
    {
      key:"2",
      Name:"Group Numero Dos",
      UpcomingEvent:false
    },
    {
      key:"3",
      Name:"Group Numero Tres",
      UpcomingEvent:false
    },
    {
      key:"4",
      Name:"Group Numero Quatro",
      UpcomingEvent:true
    },
    {
      key:"5",
      Name:"Group Numero Cinco",
      UpcomingEvent:false
    },
    {
      key:"6",
      Name:"Group Numero Seis",
      UpcomingEvent:false
    },
    {
      key:"7",
      Name:"Group Numero Siete",
      UpcomingEvent:true
    },
  ]
  return (    
    <FlatList
    style={styles.list}
    data={TEMP_DATA}
    renderItem={({item}) => GroupRow(item)}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >  
    </FlatList>
  );
}

const styles = StyleSheet.create({
  list:{
    paddingBottom:70
  }
});

export default MyGroups;