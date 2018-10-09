import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const config = {
  clientId: Platform.select({
    android: '964006513680-jg1rlph6fk3t9c8o9d97ehqqqei36uu4.apps.googleusercontent.com',
    ios: '964006513680-8lv66en1rph1tem81823kapi7pp6f01e.apps.googleusercontent.com'
  }),
  appId: Platform.select({
    android: '1:964006513680:android:e780a1589cf81b78',
    ios: '1:964006513680:ios:4309c91f70c0c7db'
  }),
  apiKey: Platform.select({
    android: 'AIzaSyBICdeAqUnqDYMJ9zGXXReIbgNUzBXH9Fs',
    ios: 'AIzaSyB6aiYDbp88gaE5BIJCVOIiyM58d1nWQTU'
  }),
  databaseURL: 'https://suryolingo-ltd.firebaseio.com',
  storageBucket: 'suryolingo-ltd.appspot.com',
  messagingSenderId: '964006513680',
  projectId: 'suryolingo-ltd',

  // enable persistence by adding the below flag
  persistence: true
};

const SuryoLingoApp = firebase.initializeApp(config, 'suryolingo');

const Analytics = SuryoLingoApp.analytics();
const Messaging = SuryoLingoApp.messaging();
const Crashlytics = SuryoLingoApp.crashlytics();

export { Analytics, Messaging, Crashlytics };
