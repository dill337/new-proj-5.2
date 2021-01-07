import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

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
    }
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDsKXEwTRfB0cF2ZoJ3ytGsluWpoohLgko",
        authDomain: "chatapp-ad960.firebaseapp.com",
        projectId: "chatapp-ad960",
        storageBucket: "chatapp-ad960.appspot.com",
        messagingSenderId: "1044879712565",
        appId: "1:1044879712565:web:6df5a3d819bea933516c7c",
        measurementId: "G-BLSEMYWQZC"
      });
    }
    const firebaseConfig =

      this.referenceMessages = firebase.firestore().collection('messages')

  }

  componentDidMount() {

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        try {
          await firebase.auth().signInAnonymously();
          console.log(user);
        } catch (error) {
          console.log(`Unable to sign in: ${error.message}`);
        }
      }
      this.setState({
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: 'https://placeimg.com/140/140/any'
        },
        loggedInText: `${this.props.route.params.name} has entered the chat`,
        messages: [],
      });
      this.unsubscribe = this.referenceMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate)
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onSend(messages = []) {
    console.log(messages);
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    //go through each document
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
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

  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      sent: true,
    });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {

    let backgroundColor = this.props.route.params.backgroundColor
    return (
      <View style={[styles.chatBackground, { backgroundColor }]}>
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chatBackground: {
    flex: 1
  },
});
