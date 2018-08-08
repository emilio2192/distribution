import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View,FlatList, ScrollView} from 'react-native';
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
      console.log(currentUser);
        
    }

    logOut() {
        const { currentUser } = firebase.auth().signOut()
    }

    delivery(item){
        this.props.navigation.navigate('Delivery', { itemValue: item});
    }
    render() {
        
        const { currentUser } = this.state
        return (
            // What if you add `height: 300` instead of `flex: 1`?
        <View style={{flex: 1}}>
            <View style={styles.menuContainer} >
                <View style={{flex:3}} >
                    <Text style={{marginTop:18, marginLeft:10}}>Bienvenido {currentUser && currentUser.email}</Text>
                </View>
                <View style={{flex:2}}>
                    
                    <TouchableHighlight onPress={this.logOut} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </View>
                </TouchableHighlight>
                </View>
                
            </View>
            <View style={{flex: 3, backgroundColor: 'skyblue'}} >
                <Text>MAP CONTAINER </Text>
            </View>
            <View style={{flex: 3}}>
                <ScrollView  >
                    <FlatList
                        data={[
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                            {key: '-LJNLtYy2EFNNVD1dlxR'},
                        ]}
                        renderItem={({item}) => <TouchableHighlight onPress={() => this.delivery(item.key)} style={styles.item} value={item.key}>
                                                    <Text style={{fontSize:18}}>{item.key} </Text>
                                                </TouchableHighlight>}
                        />
                </ScrollView>
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
