import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView } from 'react-native';

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder='Type name here ...'
        />
        <Button
          title="Chatroom"
          onPress={() => {
            // this.props.navigation.navigate('Screen2');
            this.props.navigation.navigate('Screen2', { name: this.state.name })
          }}
        />
      </View>
    )
  }
}