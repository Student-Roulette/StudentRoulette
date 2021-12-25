import React from "react";
import { StyleSheet, View, Text } from "react-native";
import EventEditForm from "../components/EventEditForm"

function EventEdit(props: any) {
  return (    
    <View>
      <Text>Event Editor</Text>
      <EventEditForm 
        initialGroupAffiliation={["Group1","Group2"]}
        initialDescription="This should be in the textarea."
      />
    </View>
  );
}

const styles = StyleSheet.create({

});

export default EventEdit;