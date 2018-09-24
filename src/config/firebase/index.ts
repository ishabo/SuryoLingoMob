import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const config = {
  clientId: Platform.select({
    android: '133197540908-jg1rlph6fk3t9c8o9d97ehqqqei36uu4.apps.googleusercontent.com',
    ios: '133197540908-e8bq7ebmuga46vbo6qpnp195n2scedkj.apps.googleusercontent.com'
  }),
  appId: Platform.select({
    android: '1:133197540908:android:e780a1589cf81b78',
    ios: '1:133197540908:ios:4309c91f70c0c7db'
  }),
  apiKey: Platform.select({
    android: 'AIzaSyBIi9kXR6o2tIZTX0xvTq9DK7M_11fmmd8',
    ios: 'AIzaSyCyfBlSsUh9mqYTcp_L_Rk9nYX72DtWD4k'
  }),
  databaseURL: 'https://suryolingo-99de9.firebaseio.com',
  storageBucket: 'suryolingo-99de9.appspot.com',
  messagingSenderId: '133197540908',
  projectId: 'suryolingo-99de9',

  // enable persistence by adding the below flag
  persistence: true
};

const SuryoLingoApp = firebase.initializeApp(config, 'suryolingo');

const Analytics = SuryoLingoApp.analytics();
const Messaging = SuryoLingoApp.messaging();

export { Analytics, Messaging };
