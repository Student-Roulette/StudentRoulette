import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import Results from "../screens/Results";
import SplashScreen from "../screens/SplashScreen";
import MyGroups from "../screens/MyGroups";
import GroupEdit from "../screens/GroupEdit";
import Group from "../screens/Group";
import MyEvents from "../screens/MyEvents";
import EventEdit from "../screens/EventEdit";
import Event from "../screens/Event";

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

function EventStackNavigator(){
      const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator initialRouteName="MyEvents">
        <Stack.Screen name="MyEvents" component={MyEvents} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="EventEdit" component={EventEdit} />
      </Stack.Navigator>
    );
}

function GroupStackNavigator(){
      const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator initialRouteName="MyGroups">
        <Stack.Screen name="MyGroups" component={MyGroups} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="GroupEdit" component={GroupEdit} />
      </Stack.Navigator>
    );
}

export {SearchStackNavigator,MainPageNavigator,EventStackNavigator,GroupStackNavigator}