import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
    constructor(props){
        super(props)
        
    }
    state = { currentUser: null }
    componentDidMount() {
      const { currentUser } = firebase.auth();
      this.setState({ currentUser });
      this.delivery = this.delivery.bind(this);
        
    }

    logOut() {
        const { currentUser } = firebase.auth().signOut()
    }
    /*
    delivery = () =>{
        //this.props.navigation.navigate('Delivery', {"itemValue":this.props.value});
        console.log(this.props.value);
    }*/

    delivery(item){
        this.props.navigation.navigate('Delivery', { itemValue: item});
        console.log(item);
    }
    render() {
        
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <View>
                <Text style={styles.info}>
                Hi {currentUser && currentUser.email}! 
                UID: {currentUser && currentUser.uid}
                </Text>
                <TouchableHighlight onPress={() => this.delivery("-LJLTs9taIiDpo4CzxtT")} underlayColor="white" value="KtWVYsG2L0h05LTUkyG">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Delivery</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.logOut} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </View>
                </TouchableHighlight>
                </View>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        alignItems: 'center'    
    },
    info:{
        flex:2,
        flexDirection:'column',
        justifyContent:'center',
        width:250,
        height:200,
        marginTop:100
    },
    button: {
        marginBottom: 100,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
      },
      buttonText: {
        padding: 20,
        color: 'white'
      }
})
