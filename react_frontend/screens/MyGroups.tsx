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
  const Data = TEMP_DATA;
  if (Data.length > 0){
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
  else{
    return (
      <View style={styles.noResultContainer}>
          <Text style={styles.noResultTitle}>Looks like we couldn't find any groups.</Text>
          <Text style={styles.noResultSubTitle}>Consider joining a group by searching for one!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noResultContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center"
  },
  noResultTitle:{
      fontSize:20
  },
  noResultSubTitle:{
      fontSize:10,
      color:"#757575"
  },
  list:{
    paddingBottom:70
  }
});

export default MyGroups;