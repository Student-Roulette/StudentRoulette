import React from "react";
import { StyleSheet, View, Text, FlatList, Animated } from "react-native";
import MaterialButton from "../components/MaterialButton";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";

function SplashScreen(props: any) {
  let TEMP_DATA: Attraction[] = [];
  for (var i = 0;i<10;i++){
    var time: Date = new Date();
    TEMP_DATA.push({id:i, createdAt:time.toString(),updatedAt:time.toString(), name:`Thing_${i}`, startTime:`${i}`, endTime:`${i+1}`});
  }
  const renderCard = ({item} : {item : Attraction}) => (
    <MaterialCardWithImageAndTitle
      key={item.id}
      title={item.name}
      startTime={new Date(item.startTime)}
      endTime={new Date(item.endTime)}
      style={styles.materialCardWithImageAndTitle}
    />
  );

  return (    
    <View>
      <Text style={styles.welcome}>Welcome!</Text>
      <MaterialButton
        style={styles.searchButtonStyle}
        textStyle={styles.searchButtonTextStyle}
        onPress={() => props.navigation.navigate('Search')}
        text="SEARCH"
        icon="shopping-search"
      /> 
      <Text>Trending/Upcoming</Text>
      <FlatList 
        horizontal={true} 
        data={TEMP_DATA} 
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: "#121212",
    textAlign: "center",
    fontSize: 34,
    marginTop: 96
  },
  searchButtonStyle: {
    backgroundColor: "rgb(144,0,33)",
    marginTop: 27,
    fontSize: 20,
    alignSelf:"center"
  },
  searchButtonTextStyle:{
    fontSize:24
  },
  materialCardWithImageAndTitle: {
    height: 166,
    width: 325,
    marginTop: 27,
    marginHorizontal: 17,
    alignSelf: "center"
  }
});

export default SplashScreen;