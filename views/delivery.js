import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableHighlight, Button, ScrollView, FlatList , Switch, Alert,TextInput} from 'react-native';
import firebase from 'react-native-firebase';

import NumericInput,{ calcSize } from 'react-native-numeric-input'
export default class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order:{
                orderId:999999999,
                deliveryDate:"31-12-2018"
            },
            customer:{},
            cambioHuevo:0,
            rejected:false
        }
        const {value} = false;
        const {valueChangeEgg} = 0;
        const {products} = [];
        const {db} = firebase.database();
    }
    ShowAlert = (value) =>{

        this.setState({
      
          rejected: value
        })
      
        if(value == true)
        {
      
          //Perform any task here which you want to execute on Switch ON event.
          Alert.alert("Se indico que fue rechazada la entrega");
        }
        else{
      
          //Perform any task here which you want to execute on Switch OFF event.
          Alert.alert("Se indico que fue aceptada la entrega");
        }
      
      }
      getCustomerDetail(order){
        console.log("entra a la funcion");
        firebase.database().ref('/customers/'+order.customerId).once('value',(customerDetail) =>{

            this.setState({
                order:order,
                customer:customerDetail.val()
            })
        });
        
    }
    async componentDidMount() {
        const itemValue = this.props.navigation.getParam("itemValue");
        this.setState({idOrder:itemValue});
        try{

        let customer;
        let orderDetail;
        const ref =firebase.database().ref('/orders/'+ itemValue);
        ref.on('value', (data)=>{
            console.log("por aqui");
            this.setState({order:data.val()});
            this.getCustomerDetail(data.val());
            orderDetail = data.val();
            
        },(error)=>{
            console.log(error.toString())
        });
        
        }catch(err){
            
            console.log(err.toString());
        }
       
    }

    goMain(item){
        this.props.navigation.navigate('Main');
    }
    
    finishDelivery(){
        objOrder = this.state.order;
        objOrder.deliveryReason=this.state.reason;
        objOrder.rejected=this.state.rejected;
        objOrder.changeEggs=this.state.cambioHuevo;
        objOrder.status="finalizada";
   
        firebase.database().ref('/orders/'+ this.state.idOrder).set(objOrder,function(error){
            if(error){
                console.log('data is not save');
            }else{
                console.log(error);
            }
        })
    }

    render() {
        
        
        return (
            <View style={styles.MainContainer}>
                <View style={{width:450, height:50}}>
                    <Button
                    title="Regresar a pantalla principal"
                    onPress={() => this.goMain()}
                    />
                </View>
                <View style={styles.rowView}>
                    <View style={styles.col1}>
                        <Text>
                            <Text style={styles.label}># Order:</Text> 
                            <Text style={styles.simpleText}>{this.state.order.orderId}</Text>
                        </Text>
                    </View>
                    <View style={styles.col1}>
                        <Text>
                            <Text style={styles.label}>Cliente:</Text> 
                            <Text style={styles.simpleText}>sadsad</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.rowInfo}>
                    <View style={styles.col1}>
                        <Text>
                            <Text style={styles.label}>Hora de entrega:</Text> 
                            <Text style={styles.simpleText}>10:30 am</Text>
                        </Text>
                    </View>
                    <View style={styles.col1}>
                        <Text >
                            <Text style={styles.label}>Tipo de Compra:</Text> 
                            <Text style={styles.simpleText}>{this.state.order.type}</Text>
                        </Text>
                    </View>
                    <View style={{width:450, height:50}}></View>
                </View>
                <View style={{width:450,height:250}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Productos:</Text>
                <ScrollView  >
                    <FlatList
                        data={
                            this.state.order.products
                        }
                        renderItem={({item}) => <Text style={{fontSize:18}}>
                            <Text style={styles.label}>Cantidad: {item.quantity} - </Text>

                            {item.name} 
                        </Text>}
                    />
                </ScrollView>
                </View>
                <View style={{width:450, height:100}}>
                    <Text style={{fontWeight:'bold', fontSize:20, marginTop:20} }> Terminar Orden</Text>
                    <View style={{width:450, marginTop:10, height:50, alignItems:'flex-start'}} >
                        <Text style={styles.label}>
                        Rechazada?</Text>
                      <Switch
                        onValueChange={(value) => this.ShowAlert(value)}
                        style={{marginBottom: 10}}
                        value={this.state.rejected} />
                        
                    </View>
                </View>
                <View style={{width:450, height:100}}>
                    <Text style={styles.label}>
                        Razon del rechazo</Text>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Escribe aqui la razon del rechazo"
                            onChangeText={(text) => this.setState({reason:text})}
                        />
                </View>
                <View style={{width:450, height:100}}>
                    <Text style={styles.label}>
                        Cambios de huevo</Text>
                        <NumericInput 
                        value={this.state.cambioHuevo} 
                        onChange={valueChangeEgg => this.setState({cambioHuevo:valueChangeEgg})} 
                        totalWidth={150} 
                        totalHeight={30} 
                        iconSize={25}
                        step={1}
                        valueType='integer'
                        rounded 
                        textColor='#2C3E50' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#138D75' 
                        leftButtonBackgroundColor='#16A085'/>
                </View>

                <View style={{flex:5, position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <Button style={{alignSelf:'flex-end'}} title="Terminar Orden" onPress={() => this.finishDelivery()} />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
    },
    rowInfo:{
        width:450,
        height:20,
        flexDirection:'row',
    },
    rowView:{
        width:450,
        height:20,
        flexDirection:'row'
    },
    col1:{
        width:200,
        height:20,
        marginBottom:10
    },
    label:{
        fontWeight: 'bold',
        fontFamily:'Roboto',
        fontSize:16
    },
    simpleText:{
        fontFamily:'Roboto',
        fontSize:14
    },
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