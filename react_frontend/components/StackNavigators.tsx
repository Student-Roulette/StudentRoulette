import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import Results from "../screens/Results";
import SplashScreen from "../screens/SplashScreen"

function MainPageNavigator(){
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen name="MainPage" component={SplashScreen} />
    </Stack.Navigator>
);
}

function SearchStackNavigator(){
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Results" component={Results} />
        </Stack.Navigator>
    );
}

export {SearchStackNavigator,MainPageNavigator}