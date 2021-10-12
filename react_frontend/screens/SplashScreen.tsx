import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialButton from "../components/MaterialButton";

function SplashScreen(props: any) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: "#121212",
    textAlign: "center",
    fontSize: 24,
    marginTop: 96
  },
  searchButtonStyle: {
    marginTop: 27,
    fontSize: 20,
    alignSelf:"center"
  },
  searchButtonTextStyle:{
    fontSize:24
  }
});

export default SplashScreen;
