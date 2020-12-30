import React from 'react';
import { View, Text } from 'react-native';


export default class Screen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', }
  }
  render() {
    let name = this.props.route.params.name;

    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is {name}</Text>
      </View>
    )
  }
}