import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

import { SwitchNavigator } from 'react-navigation';

import Loading from './views/loading';

import Login from './views/login';

import Main from './views/main';

const App = SwitchNavigator(
  {
    Loading,
    Login,
    Main
  },
  {
    initialRouteName: 'Login'
  }
)
export default App