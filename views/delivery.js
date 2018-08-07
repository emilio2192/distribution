import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
export default class Delivery extends React.Component {
    constructor(props){
        super(props)
    }
  
    render() {
        const itemValue = this.props.navigation.getParam("itemValue");
        var elements = [];
        const appRef = firebase.database().ref();
        /*const data = (itemValue) =>{
            const path = 'orders/'+itemValue;
            appRef.child(path).keepSynced(true);
            return appRef.child(path).once('value');
        };
        console.log(data());*/
        firebase.database().ref('/orders/' + itemValue).once('value').then(function(snapshot) {
            var data = snapshot;
            console.log(snapshot);
            // ...
        });
        
        return (
            <View>
                <Text>Hola{JSON.stringify(itemValue)}</Text>
               
            </View>
            
        )
    }
}