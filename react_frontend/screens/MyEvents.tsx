import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import MaterialButton from "../components/MaterialButton";
import GetDummyAttractions from "../components/DummyCalls";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";

function MyEvents(props: any) {
    const allAttractions: Attraction[] = GetDummyAttractions();
    if (allAttractions.length > 0){
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
            <FlatList 
                data={GetDummyAttractions()} 
                renderItem={renderCard}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
            />
        );
    }
    else{
        return (
            <View style={styles.noResultContainer}>
                <Text style={styles.noResultTitle}>Looks like we couldn't find any events.</Text>
                <Text style={styles.noResultSubTitle}>Try joining some groups or favoriting some events.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noResultContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    },
    noResultTitle:{
        fontSize:20
    },
    noResultSubTitle:{
        fontSize:10,
        color:"#757575"
    },
    materialCardWithImageAndTitle: {
        height: 166,
        width: 325,
        marginTop: 27,
        marginHorizontal: 17,
        alignSelf: "center"
    }
});

export default MyEvents;