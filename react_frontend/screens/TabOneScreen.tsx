import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

interface EventProperties {
  id: number;
  title: string;
  description?: number;
}


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = useState<EventProperties[]>([])

  const getEvents = async () => {
    const response = await fetch('localhost:3000/events/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json();
    setData(json.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.description}</Text>
          )}
      />
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
