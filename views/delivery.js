import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableHighlight, Button } from 'react-native';
import firebase from 'react-native-firebase';
export default class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{}
        }

    }
   componentDidMount() {
        const itemValue = this.props.navigation.getParam("itemValue");
        var ref = firebase.database().ref('/orders/' + itemValue);
        ref.on('value', (e) =>{
            console.log(e.val());
            var rows = [];
            if ( e && e.val() && e.val().map ) {
                e.val().map((v) => rows.push ( v ));
            }
            //var ds = this.state.dataSource.cloneWithRows(rows);
            console.log(rows);
            this.setState({
                data: e.val()
            });
        })
    }

    goMain(item){
        this.props.navigation.navigate('Main');
    }
    
    render() {
        /*
        var elements = [];
        const appRef = firebase.database().ref();
        
       const itemValue = this.props.navigation.getParam("itemValue");
        const otherData = firebase.database().ref('/orders/' + itemValue).once('value').then(function(snapshot) {
            //console.log(snapshot);
            return snapshot.toJSON();

        });
        

        console.log('lksadjasljda');
        console.log(otherData);


        */
        console.log(this.state);
        return (
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                <Button
          title="Go back"
          onPress={() => this.goMain()}
        />
                </View>
                <View style={{flex:1}}>
                    <Text>Order ID: {this.state.data.orderId}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text>Delivery Date: {this.state.data.deliveryDate}</Text>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    menuContainer:{
        flex:1, 
        backgroundColor:'#E3E3E3',
        flexDirection: 'row',
        height:25
    },
    button: {
     
     width: 100,
     alignItems: 'center',
     backgroundColor: '#2196F3',
     marginTop:12,
     alignSelf: 'flex-end', 
     paddingTop:10,
     paddingBottom:10,
     marginRight:10
   },
   item: {
     padding: 10,
     borderBottomWidth:1,
     height: 44,
   },
 })