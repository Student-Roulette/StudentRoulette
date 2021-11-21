import React, { Component } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import SplashScreen from "../screens/SplashScreen";
import SearchStackNavigator from "../components/StackNavigators"
import { MaterialCommunityIcons } from '@expo/vector-icons';


function TabNavigator(){
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName="Mainpage" screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                position: 'absolute',
                height: 69,
            }
        }}>
            <Tab.Screen 
                name="Mainpage" 
                component={SplashScreen}
                options={{tabBarIcon: ({focused}) => (
                    <View>
                        <MaterialCommunityIcons
                            name={"home"}
                            style={focused ? styles.icon : styles.icon_muted}
                        />
                        <Text style={styles.text}>Homepage</Text>
                    </View>
                )}}      
            />
            <Tab.Screen 
                name="Search" 
                component={SearchStackNavigator}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (
                        <View>
                            <MaterialCommunityIcons
                                name={"magnify"}
                                style={focused ? styles.icon : styles.icon_muted}
                            />
                            <Text style={styles.text}>Search</Text>
                        </View>
                )}} 
            />
            <Tab.Screen 
                name="Events" 
                component={SearchStackNavigator}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (
                        <View>
                            <MaterialCommunityIcons
                                name={"calendar-clock"}
                                style={focused ? styles.icon : styles.icon_muted}
                            />
                            <Text style={styles.text}>Events</Text>
                        </View>
                )}} 
            />
            <Tab.Screen 
                name="Groups" 
                component={SearchStackNavigator}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (
                        <View>
                            <MaterialCommunityIcons
                                name={"account-group"}
                                style={focused ? styles.icon : styles.icon_muted}
                            />
                            <Text style={styles.text}>Groups</Text>
                        </View>
                )}} 
            />
            <Tab.Screen 
                name="Settings" 
                component={SearchStackNavigator}
                options={{
                    headerShown:false,
                    tabBarIcon: ({focused}) => (
                        <View>
                            <MaterialCommunityIcons
                                name={"account-cog"}
                                style={focused ? styles.icon : styles.icon_muted}
                            />
                            <Text style={styles.text}>Settings</Text>
                        </View>
                )}} 
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    height: 90,
  },
  text: {
    color: "#fff",   
    textAlign: "center"
  },
  text_muted: {
      color: "#CCC",
      textAlign: "center"
  },
  icon: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 30
  },
  icon_muted: {
    color: "#CCC",
    alignSelf: "center",
    fontSize: 30
  }
});
export default TabNavigator