import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';
//import screens i want to navigate
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//allows to stack screens to navigate between
const Stack = createStackNavigator();

class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', }
  }

  // alert the user input
  alertMyText(input = []) {
    Alert.alert(input.text);
  }
  render() {

    return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}



export default HelloWorld