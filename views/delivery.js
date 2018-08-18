import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableHighlight, Button } from 'react-native';
import firebase from 'react-native-firebase';
export default class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order:{
                orderId:0,
                deliveryDate:""
            },
            customer:{}
        }

    }
    
    getCustomerDetail(order){
        console.log("entra a la funcion");
        firebase.database().ref('/customers/'+order.customerId).once('value',(customerDetail) =>{
            console.log("si entra");
            this.setState({
                order:order,
                customer:customerDetail.val()
            })
        });
        
    }
    async componentDidMount() {
        const itemValue = this.props.navigation.getParam("itemValue");
        try{

        let customer;
        let orderDetail;
        console.log('hola');
        const ref =firebase.database().ref('/orders/'+ itemValue);
        console.log(ref);
        ref.on('value', (data)=>{
            console.log("por aqui");
            this.setState({order:data.val()});
            this.getCustomerDetail(data.val());
            orderDetail = data.val();
            
        },(error)=>{
            console.log(error.toString())
        });
        
        console.log(this.state);
        }catch(err){
            
            console.log(err.toString());
        }
       
    }

    goMain(item){
        this.props.navigation.navigate('Main');
    }
    
    finishDelivery(){}

    render() {
        
        //console.log(this.state);
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,backgroundColor:'red', height:60}}>
                    <Button
                    title="Go back"
                    onPress={() => this.goMain()}
                    />
                </View>
                <View style={{flex:3,flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text>Order ID: {this.state.order.orderId}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text>Delivery Date: {this.state.order.deliveryDate}</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text>Customer {JSON.stringify(this.state.customer)}</Text>
                    </View>
                </View>
                <View style={{flex:5}}>
                    <Button title="Terminar Orden" onPress={() => this.finishDelivery()} />
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