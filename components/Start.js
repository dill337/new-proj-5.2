import React from 'react';
import { Text, TextInput, View, ImageBackground, TouchableOpacity, Button, StyleSheet } from 'react-native';

//const image = { uri: "https://reactjs.org/logo-og.png" };
const backgroundImage = require('../assets/Background_Image.png');

const backgroundColorOptions = ['#FFFFFF', '#474056', '#8A95A5', '#B9C6AE', '#FFFF00']

class Start extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      backgroundColor: backgroundColorOptions[0],
    };
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

        <View style={{ flex: 1, justifyContent: 'center' }}>

          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.textInput}
            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Type name here ...'
          />
          <View style={styles.chooseColorBox}>
            <Text style={styles.chooseColor}>
              Pick Your Own Background Color
            </Text>
          </View>

          <View style={styles.backgroundColorOptions}>
            <TouchableOpacity
              onPress={() => this.setState({ backgroundColor: backgroundColorOptions[0] })}
              style={[styles.colorSelector, { backgroundColor: backgroundColorOptions[0] }]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ backgroundColor: backgroundColorOptions[1] })}
              style={[styles.colorSelector, { backgroundColor: backgroundColorOptions[1] }]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ backgroundColor: backgroundColorOptions[2] })}
              style={[styles.colorSelector, { backgroundColor: backgroundColorOptions[2] }]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ backgroundColor: backgroundColorOptions[3] })}
              style={[styles.colorSelector, { backgroundColor: backgroundColorOptions[3] }]}
            />
            <TouchableOpacity
              onPress={() => this.setState({ backgroundColor: backgroundColorOptions[4] })}
              style={[styles.colorSelector, { backgroundColor: backgroundColorOptions[4] }]}
            />
          </View>
          <Button
            title="Chatroom"
            onPress={() => {
              this.props.navigation.navigate('Chat', {
                name: this.state.name,
                backgroundColor: this.state.backgroundColor
              })
            }}
          />

        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: "#FFFFFF",
  },
  chooseColorBox: {
    alignSelf: 'flex-start',
    flex: 1,
    width: '100%',
    // paddingLeft: 20,
    paddingBottom: '5%',
  },
  chooseColor: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: '300',
    color: '#000000',
    opacity: 100,
  },
  backgroundColorOptions: {
    flex: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '100%',
    justifyContent: "space-around",
    paddingLeft: 16,
    marginTop: '3%'
  },
  colorSelector: {
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: 50,
    margin: 2,
    borderColor: 'gray',
  }
})

export default Start