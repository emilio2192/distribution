import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableHighlight, Button, ScrollView, FlatList , Switch, Alert,TextInput} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import firebase from 'react-native-firebase';
export default class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order:{
                orderId:999999999,
                deliveryDate:"31-12-2018"
            },
            customer:{}
        }
        const {value} = false;
    }
    ShowAlert = (value) =>{

        this.setState({
      
          SwitchOnValueHolder: value
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
   /* getCustomerDetail(order){
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
        try{
        const ref =firebase.database().ref('/orders/'+ itemValue);
        console.log(ref);
        ref.on('value', (data)=>{
            this.setState({order:data.val()});
            this.getCustomerDetail(data.val());
            orderDetail = data.val();
        },(error)=>{
            console.log(error.toString())
        });
        
        
        }catch(err){
            
            console.log(err.toString());
        }
       
    }*/

    goMain(item){
        this.props.navigation.navigate('Main');
    }
    
    finishDelivery(){}

    render() {
        
        console.log(this.state);
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
                            <Text style={styles.simpleText}>Tienda la bendicion</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.col1}>
                        <Text>
                            <Text style={styles.label}>Hora de entrega:</Text> 
                            <Text style={styles.simpleText}>10:30 am</Text>
                        </Text>
                    </View>
                    <View style={styles.col1}>
                        <Text>
                            <Text style={styles.label}>Tipo de Compra:</Text> 
                            <Text style={styles.simpleText}>Credito</Text>
                        </Text>
                    </View>
                </View>
                <View style={{width:450,height:250}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Productos:</Text>
                <ScrollView  >
                    <FlatList
                        data={[
                            {name: '1 caja de huevos grande', cantidad:10},
                            {name: '1 docena de huevos grande', cantidad:10},
                            {name: '1 weasdasd de huevos grande', cantidad:10},
                            {name: '1 docena de asdasdas grande', cantidad:10},
                            {name: '1 fds;lfkdslfj de huevos grande', cantidad:10},
                            {name: '1 caja de huevos grande', cantidad:10},
                            {name: '1 docena de huevos grande', cantidad:10},
                            {name: '1 weasdasd de huevos grande', cantidad:10},
                            {name: '1 docena de asdasdas grande', cantidad:10},
                            {name: '1 fds;lfkdslfj de huevos grande', cantidad:10},
                        ]}
                        renderItem={({item}) => <Text style={{fontSize:18}}>
                            <Text style={styles.label}>Cantidad: {item.cantidad} - </Text>

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
                        value={this.state.SwitchOnValueHolder} />
                        
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
    rowView:{
        width:450,
        height:20,
        flexDirection:'row'
    },
    col1:{
        width:225,
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