import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

interface EventProperties {
  id: number;
  title: string;
  description?: number;
}


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<EventProperties[]>([])

  const getEvents = async () => {
    try {
      const response = await fetch('localhost:3000/events/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json();
      setData(json.events);
    } catch(error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}> {isLoading ? "loading" : "loaded"} </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id.toString()}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.description}</Text>
          )}
        />
      )}
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
