import React from "react";
import { StyleSheet, View, Text } from "react-native";
import EventEditForm from "../components/EventEditForm"

function EventEdit(props: any) {
  return (    
    <View>
      <Text>Event Editor</Text>
      <EventEditForm></EventEditForm>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default EventEdit;