import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase';
export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
  
        console.log("in function");
        const { email, password } = this.state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
          .then((user) => {
              console.log(user);
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the 
            // `onAuthStateChanged` listener we set up in App.js earlier
          })
          .catch((error) => {
            const { code, message } = error;
            console.log(error);
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
      
  }
  render() {
      
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    
    marginTop: 8
  }
})
