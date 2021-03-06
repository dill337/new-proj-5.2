import React, { Component } from 'react';
import {
  View, Platform, KeyboardAvoidingView, StyleSheet, Text, Image,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import MapView from 'react-native-maps';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import CustomActions from './CustomActions';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      loggedInText: '',
      isConnected: false,
      image: null,
      location: null,
    };

    // connects to the firestore
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDsKXEwTRfB0cF2ZoJ3ytGsluWpoohLgko',
        authDomain: 'chatapp-ad960.firebaseapp.com',
        projectId: 'chatapp-ad960',
        storageBucket: 'chatapp-ad960.appspot.com',
        messagingSenderId: '1044879712565',
        appId: '1:1044879712565:web:6df5a3d819bea933516c7c',
        measurementId: 'G-BLSEMYWQZC',
      });
    }
    this.referenceMessages = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              try {
                await firebase.auth().signInAnonymously();
              } catch (error) {
                console.log(`Unable to sign in: ${error.message}`);
              }
            }
            this.setState({
              isConnected: true,
              user: {
                _id: user.uid,
                name: this.props.route.params.name,
                avatar: 'https://placeimg.com/140/140/any',
              },
              loggedInText: `${this.props.route.params.name} has entered the chat`,
              messages: [],
            });
            this.unsubscribe = this.referenceMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
          });
        console.log('online');
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  /**
 * Sends messages
 * @async
 * @function onSend
 * @param {string} messages
 * @return {state} GiftedChat
 */
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      },
    );
  }

  /**
   * This function gets messages from async storage
   * @async
   * @function getMessages
   * @param {string} messages
   * @return {state} messages
   */
  async getMessages() {
    let messages = [];
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * updates messages state
   * @function onCollectionUpdate
   * @param {*} querySnapshot
   * @param { string } _id
   * @param { string } text
   * @param { string } image
   * @param { number } location - lattitude and longitude
   * @param { date } createdAt - date and time message sent
   * @param { string } user - user data
   */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //  go through each document
    querySnapshot.forEach((doc) => {
      //  get the QueryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        image: data.image || '',
        location: data.location || '',
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  }

  /**
   * adds messages to the firestone database
   * @function addMessages
   * @param { string } _id - message id
   * @param { string } text - message content
   * @param { date } createdAt - date & time of message
   * @param { string } user - user of app
   * @param { boolean } sent - true or false
   * @param { string } image - image
   * @param { number } location - latitude and longitude
   */
  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      sent: true,
      image: message.image || '',
      location: message.location || null,
    });
  };

  /**
   * saves messages
   * @async
   * @function saveMessages
   * @param {string} messages
   * @return {AsyncStorage}
   */
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages),
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Deletes messages
   * @async
   * @function deletMessags
   * @param {string} messages
   */
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * display input bar if app is online
   * @function renderInputToolbar
   * @param {*} props
   * @returns {InputToolbar}
   */
  renderInputToolbar = (props) => {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />
    }
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
        }}
      />
    );
  }

  /**
   * returns mapview if currentMessage has location coordinates
   * @function renderCustomView
   * @param {*} props
   * @returns { MapView }
   */
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <View>
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3,
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    return null;
  }

  renderCustomActions = (props) => <CustomActions {...props} />

  render() {
    const backgroundColor = this.props.route.params.backgroundColor;
    return (
      <View style={[styles.chatBackground, { backgroundColor }]}>
        <Text>{this.state.loggedInText}</Text>
        {this.state.image
          && <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />}
        <GiftedChat
          renderCustomView={this.renderCustomView}
          renderInputToolbar={this.renderInputToolbar}
          renderBubble={this.renderBubble.bind(this)}
          renderActions={this.renderCustomActions}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          image={this.state.image}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatBackground: {
    flex: 1,
  },
});
