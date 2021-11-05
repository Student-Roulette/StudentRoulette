import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./screens/Search";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import Results from "./screens/Results";

const Stack = createNativeStackNavigator();
const lightTheme = {
  dark: false,
  colors: {
    primary: "rgb(144,0,33)",
    background: "rgb(242,242,242)",
    card: "rgb(144,0,33)",
    text: "rgb(255,255,255)",
    border: "rgb(255, 204, 51)",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer theme={lightTheme}>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
  },
});
