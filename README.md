# React Native Chat app
Must first install by opening terminal and running

```sh
$ npm install expo-cli -g
```

## Then install all of the dependencies

```sh
@react-native-community/netinfo
@react-navigation/native
@react-navigation/stack
expo
expo-image-picker
expo-location
expo-permissions
expo-status-bar
firebase
prop-types
react
react-dom
react-native
react-native-gesture-handler
react-native-gifted-chat
react-native-maps
react-native-reanimated
react-native-safe-area-context
react-native-screens
react-native-web
react-navigation
```

# Run app by navigating to root of project in terminal and run

```sh
$ expo start
```


## Install firestore 

1. Go to https://firebase.google.com/ and click 'sign in' in the upper right hand corner
2. Create a firebase account
3.  Click on the “Go to console” link, which is also in the top-right corner of the window, and click on "Create Project"
4. Give your project a name. With the default settings selected, agree to the terms and click “Create Project.
5. Click on “Develop” from the menu on the left-hand side and, from the additional menu that appears, select “Database”
6. choose “Create database” in the Cloud Firestore section (NOT Firestore Database) and select "start in test mode"
7. For location of firestore, choose multi-region for whatever region is closest to you
8. Click on "start collection" and name it "messages"
9. Go to terminal and install firebase 
 ```sh
$ npm install --save firebase@7.9.0
```
10. Import it into your App.js
 ```sh
 const firebase = require('firebase');
require('firebase/firestore');
```
11. in project settings in browser, go to general tab, then "your apps", then "Firestore for web </>"
12. Create a name for tbe chat app, then click register
13. Copy everything between {apiKey:..  AND   messageingSenderId:...} and paste in the constructor of App.js
